 let searchBtn = document.querySelector(".search")
  let usernameinp = document.querySelector(".usernameinp")
    let usercard = document.querySelector(".user-card")


function getProfileData(username){
   return fetch(`https://api.github.com/users/${username}`).then(raw => {
      if(!raw.ok) throw new Error ("user not found")
        return raw.json();
  })
}

function getRepos(username){
   return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then ((raw) => {
    if (! raw.ok) throw new Error ( "failed to fetch repos")
        return raw.json()
   })
}

function decorateprofileData( details){
   console.log(details);
   
  let data =  ` <img class="user-avatar" src="${details.avatar_url}" alt="User Avatar" />
      <div class="user-info">
              <h2>${details.login}</h2>

        <p class="bio"> create ${details.created_at}</p>
        <p class="bio">${details.bio ? details.bio :""}</p>
        
        <div class="details">
          <p><strong>Company:</strong> ${details.company}</p>
          <p><strong>Location:</strong>${details.location}</p>
         
        </div>

        <div class="user-stats">
          <div><span>${details.public_repos}</span> Repositories</div>
          <div><span>${details.followers}</span> Followers</div>
          <div><span>${details.following}</span> Following</div>
        </div>
      </div>`

      usercard.innerHTML = data
}



 searchBtn.addEventListener("click",function (e){
    e.preventDefault(); 
    let username =  usernameinp.value.trim();
   if(username.length > 0){
       getProfileData(username).then ( (data) => {
      decorateprofileData(data)
       })
       } else{
        alert()
   }
})
