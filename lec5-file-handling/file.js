import fs from "fs"
//in file system we have two types of file operations, which is synchronous and asynchronous.
//we will dive into the reason for that later.

//write
//this is sync writing
fs.writeFileSync("./lec5-file-handling/test.txt",`${new Date().toLocaleTimeString()}`);

// fs.writeFileSync("./lec5-file-handling/static.txt","hello-node");
//this is async writing
// fs.writeFile("./lec5-file-handling/test-async.txt",`${new Date().toLocaleDateString()}`,(err)=>{
//     if(err){
//         console.log(err);
//     }
// });

//read

//this is synchronous file reading, so it returns a string after reading synchronously
// const result=fs.readFileSync("./lec5-file-handling/test.txt","utf-8");
// console.log(result);

//async reading ,does not return any string
// fs.readFile("./lec5-file-handling/test-async.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })

//ek important baat, agar dono sync and async read me hmlog asyncly written file read kre, to only async read me output ayega,
//because jb sync read krega tb tk async write ne write hi nhi kiya hoga,,, if the gao between the function calls are small.

//is tarah we have append also
// fs.appendFileSync("./lec5-file-handling/static.txt",`\nappending`);

//copying files
// fs.cpSync("./lec5-file-handling/test.txt","./lec5-file-handling/copy.txt");

//deleting file
// fs.unlinkSync("./lec5-file-handling/copy.txt")

//statistics of a file
// console.log(fs.statSync("./lec5-file-handling/test.txt"))
