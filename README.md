# WCS Verification Macro Information 

Note: use this code are your own risk, and validate it carefully before trusting it. 
We make no guarantee and provide no warantee for any of it. 

# Steps to use: 
1) probe a zero point on your machine and record the offsets 
2) model that setup with the probed location in the same place as the WCS in Fusion 
3) Modify your post to include the WCS verificationc all, and post out a program
4) Compare the posted out X,Y,Z values to the machine offsets. Either use the WCS offset parameters in the post, or edit the machine model's origin till the posted WCS values machine offsets as close as you'd like. 
5) Add the appropriate macro onto your control so it can be called as a subprogram
6) Push the green button more confidently! 


# Blum Style Macro 
Assuming you numbered your macro subprogram as 8901 

`G65 P8901 X-9.1297 Y-7.9485 Z3.4252 E0.01 W54`

where `W` is the offset number. 54-59 for normal offsets. -1, -2, etc. for extended offsets. 
For example G54.1P10 (or G154P10 on a HAAS), would be called as

`G65 P8901 X-9.1297 Y-7.9485 Z3.4252 E0.01 W-10`

# Rennishaw Style Macro

Assuming you numbered your macro subprogram as 8901 

`G65 P8901 X-9.1297 Y-7.9485 Z3.4252 E0.01 W54`

where `W` is the offset number. 54-59 for normal offsets. 101, 102, etc. for extended offsets. 
For example G54.1P10 (or G154P10 on a HAAS), would be called as

`G65 P8901 X-9.1297 Y-7.9485 Z3.4252 E0.01 W110`


# Acknowldgements --- The people that really made this work 
- [Dylan Jackson](https://www.proteummachining.com/) for telling me that Hypermill could do this 
- [Bob Schultz](https://www.linkedin.com/in/robert-schultz-/) for making the post edits that make this possible 
- [Chris Zappettini](https://github.com/ZapCon1/KnowledgeBase) for helping me convert the Brother macro over to haas and fanuc
- [Adam Morely](https://www.linkedin.com/in/adammorley132/) for helping he show you all how to do it