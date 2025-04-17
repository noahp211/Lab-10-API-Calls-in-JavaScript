document.getElementById('fetchbtn').addEventListener('click',function(){
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res=>res.json())
        .then(data=>{
            document.getElementById('output').innerHTML='<h3>'+data.title+'</h3><p>'+data.body+'</p>';
        })
        .catch(err=>{
            document.getElementById('output').innerText='Some error happened';
        });
});

document.getElementById('xhrbtn').addEventListener('click',function(){
    var request=new XMLHttpRequest();
    request.open('GET','https://jsonplaceholder.typicode.com/posts/2');
    request.onload=function(){
        if(request.status===200){
            let result=JSON.parse(request.responseText);
            document.getElementById('output').innerHTML='<h3>'+result.title+'</h3><p>'+result.body+'</p>';
        }else{
            document.getElementById('output').innerText='Something went wrong';
        }
    };
    request.onerror=function(){
        document.getElementById('output').innerText='Something went wrong';
    };
    request.send();
});

document.getElementById('submitform').addEventListener('submit',function(e){
    e.preventDefault();
    let postTitle=document.getElementById('title').value;
    let postbody=document.getElementById('body').value;
    let updateId=document.getElementById('postId').value;

    if(updateId){
        var updatexhr=new XMLHttpRequest();
        updatexhr.open('PUT','https://jsonplaceholder.typicode.com/posts/'+updateId);
        updatexhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        updatexhr.onload=function(){
            if(updatexhr.status===200){
                let updateresult=JSON.parse(updatexhr.responseText);
                document.getElementById('output').innerHTML='<h3>Updated</h3><p>'+updateresult.title+'</p><p>'+updateresult.body+'</p>';
            }else{
                document.getElementById('output').innerText='Error happened';
            }};
        updatexhr.onerror=function(){
            document.getElementById('output').innerText='Error happened';
        };
        updatexhr.send(JSON.stringify({title:postTitle,body:postbody}));
    }else{
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({title:postTitle,body:postbody})
        })
            .then(res=>res.json())
            .then(postData=>{
                document.getElementById('output').innerHTML='<h3>Post Created</h3><p>'+postData.title+'</p><p>'+postData.body+'</p>';
            })
            .catch(err=>{
                document.getElementById('output').innerText='Error posting data';
            });
    }
});
