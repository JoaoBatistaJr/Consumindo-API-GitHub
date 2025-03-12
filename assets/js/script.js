const repositories = document.querySelector(".content-main");

function getApiGithub() {
  fetch("https://api.github.com/users/joaobatistajr/repos").then(
    async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      let data = await res.json();
      data.map((item) => {
        let project = document.createElement("div");
        project.innerHTML = `
        <div class="project">
          <div>
            <h4 class="title">${item.name}</h4>
            <span class="date-create">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</span>
          </div>
          <div>
            <p>${item.description}</p>
          </div>
          <div>
            <a href="${item.html_url}" target="_blank">${item.html_url}</a>
            <span class="language"><span class="circle">${item.language}</span></span>
          </div>
        </div>
        `;

        repositories.appendChild(project);
      });
    }
  );
}

getApiGithub();
