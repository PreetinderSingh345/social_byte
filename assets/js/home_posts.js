function deleteComment(event, href){//function to delete a comment, taking the event(delete button click) and the href(url where the delete comment request has to be sent) as the arguments

    event.preventDefault();//preventing the default behavaiour of the click event as we want to send the request via ajax

    $.ajax({//making an ajax request

        type: "get",//sending a get request at the above href
        url: href,

        success: function (data) {//handling the case when we recieve the response
                   
            document.querySelector(`#comment-${data.data.commentId}`).remove();//we remove the comment element and return
            
            return ;

        },

        error: function(err){//handling the case when there is an error while receiving the reponse

            console.log("Error while fetching data : "+err);//we print a relevant error message and return
            return ;

        }

    });

}

let getComment=function(j){//function which returns the html content of the comment list item, which takes the comment object

    return (`

        <!-- showing the user an option to delete a comment, if the user is signed in and is the one who made that comment -->

        <small>

            <!-- we send the id of the comment to be deleted using string params -->
            <a href="/comments/destroy/${j._id}">X</a>

        </small>
        
        <!-- showing each comment made on a post along with the author -->

        <span>${j.content}</span>                                
        <span> : </span>
        <span>${j.user.name}</span>        

    `);

}

function createComment(event){//function to create a comment

    event.preventDefault();//preventing the default action taking place when the comment form is submitted, as we want to send the request via ajax    
                
    let inputs=event.target.getElementsByTagName("input");//getting all the input fields of the comment form on which this event is targetted

    let data="";//data to contain the post data in the form of query params to be sent to the "/comments/create" url

    for(let i=0;i<(inputs.length-1);i++){//iterating on all the inputs of the comment form which is submitted except the last submit input

        //making the post data to be sent to the "/comments/create" url

        data+=(inputs[i].getAttribute("name")+"="+inputs[i].value);

        if(i!=(inputs.length-2)){
            data+="&";
        }

    } 

    $.ajax({//making the ajax request
        
        type: "post",//sending a post request at the "/comments/create" url with the data as made above
        url: "/comments/create",
        data: data,

        success: function(data){//handling the case when we recieve the response
            
            let comment=document.createElement("li");//creating an li html element for the comment
            comment.setAttribute("id", `comment-${data.data.comment._id}`);

            comment.innerHTML=getComment(data.data.comment);//setting the html content of the comment list item, obtained from the getComment function, to which we are passing the comment object 

            document.getElementById(`post-comments-${data.data.comment.post._id}`).prepend(comment);//prepending the comment to its respective post

            let deleteCommentBtn=document.querySelector(`#comment-${data.data.comment._id} a`);//getting the delete button of this newly added comment

            deleteCommentBtn.addEventListener("click", function(event){//handling the event when the above delete comment button is clicked

                let href=deleteCommentBtn.getAttribute("href");//getting the href value i.e. the url where the delete request will be sent for the comment linked with the above delete comment button

                deleteComment(event, href);//calling the delete comment function, providing it the event and the href value

            });

            return ;

        },

        error: function(err){//handling the case when there is an error while receiving the reponse

            console.log("Error while fetching data : "+err);//we print a relevant error message and return 
            return ;

        }

    });

}

function deletePost(event, href){//function to delete a post taking the event(delete button click) and the href(url where the delete request has to be sent) as the arguments

    event.preventDefault();//preventing the default action taking place when the delete button is clicked, as we want to send the request via ajax

    $.ajax({//making the request

        type: "get",//we're making a get request at the above href
        url: href,

        success: function (data) {//handling the case when we recieve the response

            document.getElementById(`post-${data.data.postId}`).remove();//removing the post whose delete button was clicked and then we return

            return ;
            
        },

        error: function(err){//handling the case when there is an error while receiving the reponse

            console.log("Error while fetching data : "+err);//we print a relevant error message and return
            return ;

        }

    });

}

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
        
                <!-- added comment forms class to the form to add comments to a post -->

                <form action="/comments/create" method="POST" class="comment-forms">
    
                    <input type="text" name="content" placeholder="Comment here..." required>
    
                    <!-- hidden input for sending the id of the post on which the comment has been made -->
    
                    <input type="hidden" name="post" value="${i._id}">                           
                    <input type="submit" value="Comment">
    
                </form>
        
                <!-- post comments list container to show all the comments made on a post and the comments should be made visible even if the user is not signed in -->
        
                <ul class="post-comments-list" id="post-comments-${i._id}">

                    <!-- the comments will be shown when they are appended -->      
        
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

            let deletePostBtn=document.querySelector(`#post-${data.data.post._id} .delete-post-button`);//getting the delete button of the post being appended above

            let href=deletePostBtn.getAttribute("href");//getting the url where the delete request of the post linked with the above delete button is sent

            deletePostBtn.addEventListener("click", function(event){//handling the event when the delete button is clicked
                deletePost(event, href);//calling delete post, providing it the event and the href
            });

            let commentForm=document.querySelector(`#post-${data.data.post._id} .comment-forms`);//adding the event listener for the comment form of this newly added post

            commentForm.addEventListener("submit", createComment);//handling the event when the above comment form is submitted
            
            return ;

        },

        error: function(err){//handling the case when there is an error while receiving the reponse

            console.log("Error while fetching data : "+err);//we print a relevant error message and simply return 
            return ;

        }

    });

}); 

let deletePostBtns=document.getElementsByClassName("delete-post-button");//getting all the elements with the class delete post button applied to them

for(let i=0;i<deletePostBtns.length;i++){//iterating on the above delete buttons

    let deletePostBtn=deletePostBtns[i];//getting a particular delete button

    let href=deletePostBtn.getAttribute("href");//getting the url where the delete request of the post linked with the above delete button is sent

    deletePostBtn.addEventListener("click", function(event){//handling the event when the delete button is clicked
        deletePost(event, href);//calling delete post, providing it the event and the href
    });

}

let commentForms=document.getElementsByClassName("comment-forms");//getting all the elements with the class as comment forms

for(let i=0;i<commentForms.length;i++){//iterating on the above comment forms

    let commentForm=commentForms[i];//getting a particular comment form

    commentForm.addEventListener("submit", createComment);//handling the event when the above comment form is submitted

}

let deleteCommentBtns=document.getElementsByClassName("delete-comment-button");//getting all the elements with the class delete comment button applied to them

for(let i=0;i<deleteCommentBtns.length;i++){//iterating on the above delete comment buttons

    let deleteCommentBtn=deleteCommentBtns[i];//getting a particular delete comment button

    deleteCommentBtn.addEventListener("click", function(event){//handling the event when the above delete comment button is clicked

        let href=deleteCommentBtn.getAttribute("href");//getting the href value i.e. the url where the delete reuqest will be sent for the comment linked with the above delete comment button

        deleteComment(event, href);//calling the delete comment function, providing it the event and the href value

    });

}