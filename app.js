// JavaScript Document

var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var InitDemo = function () {
	console.log('This is working');

	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.28, 0.24, 0.23, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//
	// Create shaders
	// 
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
	
	//////////////// AQUÍ SE CREAN LAS OORDENAS DE LOS TRIÁNGULOS  ////////////////////////////
	
	var triangleVertices = 
	[ //  X,     Y,       R,     G,   B
	
		/// Spaider-man ///
		//1
		-0.86, -0.15,    0.31, 0.06, 0.03,
		-0.86, -0.24,  	 0.31, 0.06, 0.03,
		-0.72,-0.24,     0.31, 0.06, 0.03,
		
		//2
		-0.78, 0.03,     0.50, 0.10, 0.05,
		-0.86, -0.15,    0.50, 0.10, 0.05,
		-0.72, -0.24,  	 0.50, 0.10, 0.05,
		
		//3
		-0.86, 0.01,    0.53, 0.17, 0.04,
		-0.86, -0.15,   0.53, 0.17, 0.04,
		-0.78, 0.03,    0.53, 0.17, 0.04,
		
		//4
		-0.78, 0.03,    0.31, 0.06, 0.02,
		-0.72, -0.24,   0.31, 0.06, 0.02,
		-0.46, -0.26,   0.31, 0.06, 0.02,
		
		//5
		-0.78, 0.03,	0.34, 0.07, 0.02,	
		-0.66, -0.08,	0.34, 0.07, 0.02,
		-0.66, 0.09, 	0.34, 0.07, 0.02,
		
		//6
		-0.66, 0.09,	0.91, 0.22, 0.12,
		-0.66, 0.02,	0.91, 0.22, 0.12,
		-0.51, 0.01,	0.91, 0.22, 0.12,
		
		//7
		-0.66, 0.02,	0.73, 0.74, 0.71,
		-0.47, -0.11,	0.73, 0.74, 0.71,
		-0.51, 0.01,	0.73, 0.74, 0.71,
		
		//8
		-0.66, 0.02,	0.47, 0.48, 0.46,
		-0.66, -0.08,	0.47, 0.48, 0.46,
		-0.47, -0.11,	0.47, 0.48, 0.46,
		
		//9
		-0.51, 0.01,	0.88, 0.277, 0.16,
		-0.47, -0.11,	0.88, 0.277, 0.16,
		-0.47, -0.05,	0.88, 0.277, 0.16,
		
		//10
		-0.66, -0.08,	0.50,0.11,0.05,
		-0.46, -0.26,	0.50,0.11,0.05,
		-0.47, -0.11,	0.50,0.11,0.05,
		
		//11
		-0.87, -0.24,	0.15, 0.03, 0.02,
		-0.75, -0.36,	0.15, 0.03, 0.02,
		-0.43, -0.26,	0.15, 0.03, 0.02,
		
		//12
		-0.86, -0.40,	0.75, 0.27, 0.12,
		-0.68, -0.44,	0.75, 0.27, 0.12,
		-0.63, -0.32,	0.75, 0.27, 0.12,
		
		//13
		-0.68, -0.44,	0.75, 0.27, 0.12,
		-0.45, -0.35,	0.75, 0.27, 0.12,
		-0.63, -0.32,	0.75, 0.27, 0.12,
		
		//14
		-0.68, -0.44,	0.40, 0.11, 0.06,
		-0.22, -0.37,	0.40, 0.11, 0.06,
		-0.45, -0.35,	0.40, 0.11, 0.06,
		
		//15
		-0.45, -0.35,	0.77, 0.12, 0.10,
		-0.22, -0.37,	0.77, 0.12, 0.10,
		-0.23, -0.31,	0.77, 0.12, 0.10,
		
		//16
		-0.68, -0.44,	0.19,0.07, 0.06,
		-0.41, -0.47,	0.19,0.07, 0.06,
		-0.22, -0.37,	0.19,0.07, 0.06,
		
		//17
		-0.83, -0.54,	0.30, 0.07, 0.02,
		-0.41, -0.47,	0.30, 0.07, 0.02,
		-0.80, -0.41,	0.30, 0.07, 0.02,
		
		//18
		-0.41, -0.47,	0.03, 0.03, 0.10,
		-0.26, -0.46,	0.03, 0.03, 0.10,
		-0.22, -0.37,	0.03, 0.03, 0.10,
		
		//19
		-0.83, -0.54,	0.02, 0.04, 0.17,
		-0.48, -0.58,	0.02, 0.04, 0.17,
		-0.26, -0.46,	0.02, 0.04, 0.17,
		
		//20
		-0.48, -0.58,	0.49, 0.11, 0.05,
		-0.30, -0.66,	0.49, 0.11, 0.05,
		-0.39, -0.53,	0.49, 0.11, 0.05,
		
		//21
		-0.83, -0.54,	0.01, 0.02, 0.07,
		-0.45, -1,		0.01, 0.02, 0.07,
		-0.48, -0.58,	0.01, 0.02, 0.07,
		
		//22
		-0.83, -0.54,	0.01, 0.02, 0.07,
		-0.65, -0.99,	0.01, 0.02, 0.07,
		-0.45, -1,		0.01, 0.02, 0.07,
		
		//23
		-0.48,  -0.58,	0.02, 0.05, 0.16,
		-0.45, -1,		0.02, 0.05, 0.16,
		-0.30, -1,		0.02, 0.05, 0.16,
		
		//24
		-0.48, -0.58,	0.04, 0.07, 0.33,
		-0.30, -1,		0.04, 0.07, 0.33,
		-0.30, -0.66,	0.04, 0.07, 0.33,
		
		//25 //////// 75
		-0.30, -0.92,	0.50, 0.10, 0.05,
		-0.2, -0.87,	0.50, 0.10, 0.05,
		-0.30, -0.66,	0.50, 0.10, 0.05,
		
		/// Mysterio ///
		//1
		-0.33, 0.65,     0.98, 0.96, 0.99,
		-0.31, 0.41,  	 0.98, 0.96, 0.99,
		-0.23, 0.76,     0.98, 0.96, 0.99,
		
		//2
		-0.31, 0.41,     0.68, 0.66, 0.77,
		-0.11, 0.61,     0.68, 0.66, 0.77,
		-0.23, 0.76,  	 0.68, 0.66, 0.77,
		
		//3
		-0.23, 0.76,    0.86, 0.79, 0.90,
		-0.11, 0.61,    0.86, 0.79, 0.90,
		0.27, 0.68,     0.86, 0.79, 0.90,
	
		//4
		-0.23, 0.76,    0.98, 0.96, 0.99,
		0.27, 0.68,     0.98, 0.96, 0.99,
		0.07, 0.84,     0.98, 0.96, 0.99,
		
		//5
		-0.11, 0.61,	0.65, 0.44, 0.76,	
		-0.16, 0.43,	0.65, 0.44, 0.76,
		0.26, 0.68, 	0.65, 0.44, 0.76,
		
		//6/Mal
		-0.31, 0.41 ,	0.85, 0.72, 0.94,
		-0.14, 0.50,	0.85, 0.72, 0.94,
		-0.11, 0.6187,	0.85, 0.72, 0.94,
		
		//7
		-0.31, 0.41,	0.39, 0.25, 0.43,
		-0.27, 0.02,	0.39, 0.25, 0.43,
		-0.14, 0.50,	0.39, 0.25, 0.43,
		
		//8
		-0.15, 0.43,	0.56, 0.32, 0.60,
		0.47, 0.54,		0.56, 0.32, 0.60,
		0.26, 0.68,		0.56, 0.32, 0.60,
		
		//9
		-0.15, 0.43,	0.36, 0.18, 0.60,
		0.42, 0.43,		0.36, 0.18, 0.60,
		0.47, 0.54,		0.36, 0.18, 0.60,
		
		//10
		0.42, 0.43,		0.33,0.16,0.34,
		0.50, 0.35,		0.33,0.16,0.34,
		0.47, 0.54,		0.33,0.16,0.34,
		
		//11
		-0.15, 0.43,	0.50, 0.24, 0.51,
		0.18, -0.33,	0.50, 0.24, 0.51,
		0.42, 0.43,		0.50, 0.24, 0.51,
		
		//12
		0.18, 0.33,		0.43, 0.20, 0.51,
		0.49, -1,	    0.43, 0.20, 0.51,
		0.42, 0.43,		0.43, 0.20, 0.51,
		
		//13
		0.42, 0.43,		0.60, 0.29, 0.65,
		0.76, -1,    	0.60, 0.29, 0.65,
		0.50, 0.35,		0.60, 0.29, 0.65,
		
		//14
		0.49, -1,   	0.25, 0.12, 0.29,
		0.76, -1,   	0.25, 0.12, 0.29,
		0.42, 0.43,		0.25, 0.12, 0.29,
		
		//15
		-0.15, 0.43,	0.29, 0.33, 0.28,
		-0.14, 0.23,	0.29, 0.33, 0.28,
		0.18, 0.33,		0.29, 0.33, 0.28,
		
		//16
		-0.14, 0.23,	0.14,0.19, 0.06,
		0.09, 0.14,		0.14,0.19, 0.06,
		0.18, 0.33,		0.14,0.19, 0.06,
		
		//17
		-0.27, 0.022,	0.19, 0.27, 0.06,
		-0.14, 0.23,	0.19, 0.27, 0.06,
		-0.15, 0.43,	0.19, 0.27, 0.06,
		
		//18
		-0.27,  0.02,	0.36, 0.48, 0.29,
		0.098, 0.14,	0.36, 0.48, 0.29,
		-0.14, 0.23,	0.36, 0.48, 0.29,
		//19
		-0.27, 0.02,	0.11, 0.16, 0.08,
		-0.22, -0.36,	0.11, 0.16, 0.08,
		0.10, 0.14,		0.11, 0.16, 0.08,
		
		//20
		-0.12, -0.2,	0.36, 0.48, 0.28,
		0.098, -0.49,	0.36, 0.48, 0.28,
		0.098, 0.14,	0.36, 0.48, 0.28,
		
		//21
		0.098, 0.14,	0.03, 0.09, 0.01,
		0.098, -0.49,   0.03, 0.09, 0.01,
		0.49, -1,   	0.03, 0.09, 0.01,
		
		//22
		0.098, 0.14,	0.2, 0.10, 0.20,
		0.49, -1,		0.2, 0.10, 0.20,
		0.18, 0.33,		0.2, 0.10, 0.20,
		//23
		-0.28,  -0.45,		0.19, 0.29, 0.17,
		0.098, -0.49,		0.19, 0.29, 0.17,
		-0.12, -0.20,		0.19, 0.29, 0.17,
		
		//24
		-0.25, -0.45,		0.29, 0.33, 0.28,
		0.001, -0.86,		0.29, 0.33, 0.28,
		0.098, -0.49,		0.29, 0.33, 0.28,
		
		//25 
		0.029, -1,		0.14, 0.19, 0.12,
		0.49, -1,		0.14, 0.19, 0.12,
		0.098, -0.49,	0.14, 0.19, 0.12,
		
		//26
		0.001, -0.86,	0.36, 0.48, 0.28,
		0.029, -1,		0.36, 0.48, 0.28,
		0.098, -0.49,	0.36, 0.48, 0.28,
		
		//27
		-0.25, -0.45,	0.11, 0.16, 0.08,
		-0.19, -0.86,	0.11, 0.16, 0.08,
		0.001, -0.86,	0.11, 0.16, 0.08,
		
		//28
		-0.29,  -0.92,	0.22, 0.38, 0.18,
		-0.29, -1,		0.22, 0.38, 0.18,
		0.001, -0.86,	0.22, 0.38, 0.18,
		
		//29	
		-0.29, -1,		0.14, 0.19, 0.12,
		0.029, -1,		0.14, 0.19, 0.12,
		-0.19, -0.86,	0.14, 0.19, 0.12,
		
		//30 
		-0.19, -0.86,	0.03, 0.05, 0.02,
		0.029, -1,		0.03, 0.05, 0.02,
		0.0017, -0.86,	0.03, 0.05, 0.02,
	];

	

	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	//
	// Main render loop
	//
	
	/////////////// SE IMPRIMEN LOS TRIÁNGULOS /////////////////
	//// EL PRIMER NÚMERO SON DE QUÉ VERTICE EMPIEZA Y EL OTRO ES CUÁNTOS TOMA, EL ÚLTIMO SE DEJA EN 3, EL OTRO CAMBIA EN DONDE LOS CREÓ ///////////////////
	
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	gl.drawArrays(gl.TRIANGLES, 3, 3);
	gl.drawArrays(gl.TRIANGLES, 6, 3);
	gl.drawArrays(gl.TRIANGLES, 9, 3);
	gl.drawArrays(gl.TRIANGLES, 12, 3);
	gl.drawArrays(gl.TRIANGLES, 15, 3);
	gl.drawArrays(gl.TRIANGLES, 18, 3);
	gl.drawArrays(gl.TRIANGLES, 21, 3);
	gl.drawArrays(gl.TRIANGLES, 24, 3);
	gl.drawArrays(gl.TRIANGLES, 27, 3);
	gl.drawArrays(gl.TRIANGLES, 30, 3);
	gl.drawArrays(gl.TRIANGLES, 33, 3);
	gl.drawArrays(gl.TRIANGLES, 36, 3);
	gl.drawArrays(gl.TRIANGLES, 39, 3);
	gl.drawArrays(gl.TRIANGLES, 42, 3);
	gl.drawArrays(gl.TRIANGLES, 45, 3);
	gl.drawArrays(gl.TRIANGLES, 48, 3);
	gl.drawArrays(gl.TRIANGLES, 51, 3);
	gl.drawArrays(gl.TRIANGLES, 54, 3);
	gl.drawArrays(gl.TRIANGLES, 57, 3);
	gl.drawArrays(gl.TRIANGLES, 60, 3);
	gl.drawArrays(gl.TRIANGLES, 63, 3);
	gl.drawArrays(gl.TRIANGLES, 66, 3);
	gl.drawArrays(gl.TRIANGLES, 69, 3);
	gl.drawArrays(gl.TRIANGLES, 72, 3);
	gl.drawArrays(gl.TRIANGLES, 75, 3);
	gl.drawArrays(gl.TRIANGLES, 78, 3);
	gl.drawArrays(gl.TRIANGLES, 81, 3);
	gl.drawArrays(gl.TRIANGLES, 84, 3);
	gl.drawArrays(gl.TRIANGLES, 87, 3);
	gl.drawArrays(gl.TRIANGLES, 90, 3);
	gl.drawArrays(gl.TRIANGLES, 93, 3);
	gl.drawArrays(gl.TRIANGLES, 96, 3);
	gl.drawArrays(gl.TRIANGLES, 99, 3);
	gl.drawArrays(gl.TRIANGLES, 102, 3);
	gl.drawArrays(gl.TRIANGLES, 105, 3);
	gl.drawArrays(gl.TRIANGLES, 108, 3);
	gl.drawArrays(gl.TRIANGLES, 111, 3);
	gl.drawArrays(gl.TRIANGLES, 114, 3);
	gl.drawArrays(gl.TRIANGLES, 117, 3);
	gl.drawArrays(gl.TRIANGLES, 120, 3);
	gl.drawArrays(gl.TRIANGLES, 123, 3);
	gl.drawArrays(gl.TRIANGLES, 126, 3);
	gl.drawArrays(gl.TRIANGLES, 129, 3);
	gl.drawArrays(gl.TRIANGLES, 132, 3);
	gl.drawArrays(gl.TRIANGLES, 135, 3);
	gl.drawArrays(gl.TRIANGLES, 138, 3);
	gl.drawArrays(gl.TRIANGLES, 141, 3);
	gl.drawArrays(gl.TRIANGLES, 144, 3);
	gl.drawArrays(gl.TRIANGLES, 147, 3);
	gl.drawArrays(gl.TRIANGLES, 150, 3);
	gl.drawArrays(gl.TRIANGLES, 153, 3);
	gl.drawArrays(gl.TRIANGLES, 156, 3);
	gl.drawArrays(gl.TRIANGLES, 159, 3);
	gl.drawArrays(gl.TRIANGLES, 162, 3);
	gl.drawArrays(gl.TRIANGLES, 165, 3);
	gl.drawArrays(gl.TRIANGLES, 168, 3);
};