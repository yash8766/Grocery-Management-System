package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.UserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class UserController {
@Autowired
    private  UserService userService;

@Autowired
  private PasswordEncoder passwordEncoder;
  

    // 1. Register a new customer
    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
        	user.setPassword(passwordEncoder.encode(user.getPassword()));
            User newUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    // 2. Edit customer details
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
        	userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }

    // 3. Get all customers
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching users");
        }
    }

    // 4. Get customer by ID
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
   
}

