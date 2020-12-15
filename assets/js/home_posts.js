let newPost=function(i){//new post function which takes the new post and appends it to the posts list 

    //returning the content to be appended to the posts list

    return $(`

        <!-- to show each post and its related options -->

        <li id="post-${i._id}">            
        
            <!-- showing the user an option to delete a post if the user is signed in and is the one who made it(.id gives the ObjectId in the string format and this format is preferred for ObjectId comparison) -->
        
            <small>
    
                <!-- we send the id of the post to be deleted using string params -->
                <a class="delete-post-button" href="/posts/destroy/${i._id}">X</a>
    
            </small>   
        
            <!-- showing the content and the author of each post -->                
        
            <span>${i.content}</span>
            <span> : </span>
            <span>${i.user.name}</span>    
            
            <!-- post comments container for each post -->
        
            <div class="post-comments">
        
                <!-- showing the user a form to add comments on each post when the user is signed in -->
        
                <form action="/comments/create" method="POST">
    
                    <input type="text" name="content" placeholder="Comment here..." required>
    
                    <!-- hidden input for sending the id of the post on which the comment has been made -->
    
                    <input type="hidden" name="post" value="${i._id}">                           
                    <input type="submit" value="Comment">
    
                </form>
        
                <!-- post comments list container to show all the comments made on a post and the comments should be made visible even if the user is not signed in -->
        
                <ul class="post-comments-list" id="post-comments-${i._id}">

                    <!-- the comments will be shown when the comments are appended -->                   
        
                </ul>
        
            </div>
        
        </li>

    `);

}

let postsForm=$("#posts-form");//getting the posts form
let postsList=$("#posts-list");//getting the posts list

postsForm.submit(function(event){//handling the event when the posts form is submitted

    event.preventDefault();//preventing the default action taking place when the posts form is submitted, as we want to send the request via ajax

    $.ajax({//making an ajax request        

        type: "post",// we're making a post request at the "/posts/create" url
        url: "/posts/create",
        data: postsForm.serialize(),//we are serializing the posts form, so that it's data is sent in the json format to the above url

        success: function (data) {//handling the case when we recieve the response
            
            postsList.prepend(newPost(data.data.post));//appending at the top(prepend), the new post to the posts list and then we simply return 
            return ;

        },

        error: function(err){//handling the case when there is an error while receiving the reponse

            console.log("Error while fetching data : "+err);//we print a relevant error message and simply return 
            return ;

        }

    });

});    