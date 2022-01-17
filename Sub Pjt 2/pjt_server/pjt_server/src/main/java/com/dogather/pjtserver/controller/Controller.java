package com.dogather.pjtserver.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

	@GetMapping("")
	public String aa() {
		return "index.html";
	}
}
