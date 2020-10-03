
function App(){
    var file;
    let req = new XMLHttpRequest();
    req.open('POST','https://elevate-be-staging.azurewebsites.net/instafeed.php',true);
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
          file=JSON.parse(req.responseText);
          console.log(file)

          document.getElementById('profileImg').innerHTML+="<img id='profile' src="+ file.graphql.user.profile_pic_url_hd +" alt=''>"
          document.getElementById('name').innerHTML+=file.graphql.user.username;
          document.getElementById('fullName').innerHTML+=file.graphql.user.full_name;
          document.getElementById('about').innerHTML+=file.graphql.user.biography;

         
          var len = Object.keys(file.graphql.user.edge_owner_to_timeline_media.edges).length;
          console.log(len);
          
          for(var i=0;i<len;i++){
           
            var unixtimestamp = file.graphql.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp;
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var date = new Date(unixtimestamp*1000);
            var year = date.getFullYear();
            var month = months_arr[date.getMonth()];
            var day = date.getDate();
         
            // Display date time in MM-dd-yyyy format
            var convdataTime = month+' '+day+','+year;
            
            var pic=file.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;

            var captn="<a href="+file.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text.substring(0,10)+">Post</a>";

            // console.log(captn)

            

            document.getElementById('mainCard').innerHTML+="<div class='pad'><div class='card promoting-card sized shadowDes'><div class='card-body d-flex flex-row'><img src="+ file.graphql.user.profile_pic_url_hd +" class='rounded-circle mr-3 ' height='50px' width='50px' alt='avatar'><div><h4 class='licet'>"+file.graphql.user.username+"</h4><p class='card-text alignation'><i class='far fa-clock pr-2'></i>"+ convdataTime+"</p></div></div><div class='view overlay'><img class='card-img-top rounded-0' src="+ file.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url+" ondblclick='heartFunc("+i+")' alt=''></div><div class='card-body'> <div class='collapse-content'><p class='card-text alignation'>"+ file.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text.substring(0,200)+"<span id='dots"+i+"'>...</span><span id='demo"+i+"' class='collapse'>"+file.graphql.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text.substring(200)+"</span><button onclick='myFunction("+i+")' type='button' id='myBtn"+i+"' class='btn btn-light' data-toggle='collapse' data-target='#demo"+i+"'>Read more</button></p></div></div><div class='icon'><div class='row'><div id='hrt"+i+"'><i class='far fa-heart heart' onclick='heartFunc("+i+")'></i></div><a href='mailto:?subject=licetpattarai LICET&amp;body="+pic+"' title='Share by Email'><i class='far fa-paper-plane mailP'></i></a></div></div></div></div>";


            

            }

        }
    }
    req.send();
  }

  function myFunction(num) {
    console.log(num);
    var dots = document.getElementById("dots"+num+"");
    var moreText = document.getElementById("demo"+num);
    var btnText = document.getElementById("myBtn"+num);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

  function heartFunc(val){
    var heart=document.getElementById("hrt"+val);

    heart.innerHTML="<i class='fas fa-heart heartFill' onclick=heartRevFunc("+val+")></i>";
  }

  function heartRevFunc(nu){
    var heart=document.getElementById("hrt"+nu);

    heart.innerHTML="<i class='far fa-heart heart' onclick=heartFunc("+nu+")></i>";
  }

  function message(pos){
     var msg=document.getElementById("mail"+pos);

     msg.innerHTML="<a href='mailto:?subject=I wanted you to see this site&amp;body=body=Check out this site http://www.website.com.' title='Share by Email'></a>"
  }
