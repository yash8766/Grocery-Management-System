package com.app.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.ProductDTO;
import com.app.DTO.ProductUpdateDTO;
import com.app.Entity.Product;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.CategoryRepository;
import com.app.Repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	@Override
    public Product addProduct(String productName, double price, double quantity, MultipartFile productImage, Long categoryId) {
        try {
        	
        	
            Product product = new Product();
            product.setProductName(productName);
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setProductImage(productImage.getBytes());
            product.setCategory(categoryRepository.findById(categoryId).orElse(null));
            
            return productRepository.save(product);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process product image", e);
        }
    }
	@Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId);
    }
	public List<ProductDTO> getAllProducts() {
	    List<Product> products = productRepository.findAll();
	    return products.stream()
	                   .map(ProductDTO::new)  // Map each Product to ProductDTO
	                   .collect(Collectors.toList());
	}
	
	public Product updateProduct(Long productId, ProductUpdateDTO productUpdateDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        product.setPrice(productUpdateDTO.getPrice());
        product.setQuantity(productUpdateDTO.getQuantity());

        return productRepository.save(product);
    }
	public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
    }
}
