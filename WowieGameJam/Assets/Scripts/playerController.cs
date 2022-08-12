using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class playerController : MonoBehaviour
{
    private Rigidbody2D rb;
    public float jumpForce = 5;
    public float runSpeed = 5;
    private bool isGrounded = true;
    private int jumpCounter = 0;
    public int maxJumps = 2;
    public GameObject ground;
    public Transform position;
    private LayerMask WhatIsGround;	
    private LayerMask WhatIsAI;	
    public bool AIinReach = false;

    private float AIDistance = 3;
    // Start is called before the first frame update
    void Start()
    {
        rb = gameObject.GetComponent<Rigidbody2D>();
        position = gameObject.GetComponent<Transform>();
        WhatIsGround  = LayerMask.GetMask("Ground");
        WhatIsAI  = LayerMask.GetMask("AI");

    }

    // Update is called once per frame
    void Update()
    {
        float speed = runSpeed*Input.GetAxisRaw("Horizontal");
        if (Input.GetButtonDown("Jump")){
            jump();
        }
        move(speed);
        isGrounded = false;

				GroundCheck();
    }
    void GroundCheck()
    {
        isGrounded = false;

		Collider2D[] colliders = Physics2D.OverlapCircleAll(position.position, 1f, WhatIsGround);
		for (int i = 0; i < colliders.Length; i++)
		{
			if (colliders[i].gameObject != gameObject)
				isGrounded = true;
                jumpCounter = 0;
		}
        AIinReach = false;
        colliders = Physics2D.OverlapCircleAll(position.position, AIDistance, WhatIsAI);
		for (int i = 0; i < colliders.Length; i++)
		{
			if (colliders[i].gameObject != gameObject)
				AIinReach = true;
		}
    }
    void jump(){
        if (isGrounded || jumpCounter<maxJumps){
            rb.velocity = new Vector3(0,jumpForce,0);
            if(!isGrounded){
                jumpCounter++;
            }
        }
    }
    void move(float speed){
        
        rb.velocity = new Vector3(speed,rb.velocity.y,0);
    }
}
