package com.app.DTO;

import com.app.Entity.Product;

public class ProductDTO {
	private Long id;
    private String productName;
    private double price;
    private double quantity;
    private String categoryName; // category name to be returned

    public ProductDTO(Product product) {
    	this.id=product.getProductId();
        this.productName = product.getProductName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.categoryName = product.getCategory() != null ? product.getCategory().getName() : "N/A"; // Handle null category
    }

    // Getters and Setters
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
