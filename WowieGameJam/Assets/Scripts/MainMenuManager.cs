using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenuManager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void QuitButton(){
        Application.Quit();
        Debug.Log("Quit");
    }
    public void Settings(){
        SceneManager.LoadScene("Settings");
    }
    public void StartGame(){
        SceneManager.LoadScene("SampleScene");
    }
}
