using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scri : MonoBehaviour {
	
	public float angle;
	float smooth = 360.0f;
    float tiltAngle = 10.0f;
	float tiltAngle2 = 100.0f;


	void Start () {
	
	angle = 0f;
		
	}

	void Update () {
		

        float tiltAroundX = Input.GetAxis("Horizontal") * tiltAngle;

		float tiltAroundY = Input.GetAxis("Horizontal") * tiltAngle2;

		tiltAngle = tiltAngle+10000000;

		tiltAngle2 = tiltAngle2+1000;

        Quaternion target = Quaternion.Euler(0, tiltAroundX, 0);

		Quaternion target2 = Quaternion.Euler( tiltAroundY, 0, 0);

		gameObject.transform.GetChild(0).transform.GetChild(0).transform.GetChild(0).transform.rotation = Quaternion.Slerp(transform.rotation, target,  Time.deltaTime * smooth);

		gameObject.transform.GetChild(0).transform.GetChild(1).transform.GetChild(0).transform.rotation = Quaternion.Slerp(transform.rotation, target2,  Time.deltaTime * smooth);

	}
}
