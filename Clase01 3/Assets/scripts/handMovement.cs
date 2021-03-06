﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class handMovement : MonoBehaviour {
	public float angle;
	float smooth = 90.0f;
    float tiltAngle = 60.0f;
	
	// Use this for initialization
	void Start () {
		angle = 0f;
	}
	
	// Update is called once per frame
	void Update () {
		/*
		//ROTACION EN UN ANGULO DADO CON ANGULOS DE EULER
		Quaternion target = Quaternion.Euler(angle, 0, 0);
		gameObject.transform.GetChild(1).transform.rotation = target;
		angle+=0.1f;*/
		
		//ROTACION CON CUATERNIONES Y SLERP
		// Smoothly tilts a transform towards a target rotation.
        //float tiltAroundZ = Input.GetAxis("Horizontal") * tiltAngle;
        float tiltAroundX = Input.GetAxis("Horizontal") * tiltAngle;

        // Rotate the cube by converting the angles into a quaternion.
        Quaternion target = Quaternion.Euler(tiltAroundX, 0, 0);

        // Dampen towards the target rotation
        gameObject.transform.GetChild(1).transform.rotation = Quaternion.Slerp(transform.rotation, target,  Time.deltaTime * smooth);
	}
}
