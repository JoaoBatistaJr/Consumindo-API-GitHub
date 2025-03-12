const repositories = document.querySelector(".content-main");

// 🔑 Substitua pelo seu token pessoal do GitHub (NÃO compartilhe publicamente)
const GITHUB_TOKEN = "TOKEN-AQUI"; // ⚠ Troque por seu token pessoal

// Mapeamento de cores das linguagens (com base nas cores do GitHub)
const languageColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#3178c6",
  C: "#555555",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Shell: "#89e051",
};

// Configuração dos headers com autenticação
const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`, // Token no cabeçalho
  Accept: "application/vnd.github.v3+json",
};

async function getApiGithub() {
  try {
    console.log("Buscando repositórios...");
    const res = await fetch("https://api.github.com/users/joaobatistajr/repos", { headers });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

    let data = await res.json();

    for (let item of data) {
      const languageRes = await fetch(item.languages_url, { headers });
      const languages = await languageRes.json();

      let languageElements = Object.keys(languages)
        .map(
          (lang) => `
          <span class="language">
            <span class="circle" style="background-color: ${
              languageColors[lang] || "#ccc"
            };"></span> ${lang}
          </span>
        `
        )
        .join("");

      let project = document.createElement("div");
      project.classList.add("project");
      project.innerHTML = `
        <div>
          <h4 class="title">${item.name}</h4>
          <span class="date-create">${Intl.DateTimeFormat("pt-BR").format(new Date(item.created_at))}</span>
        </div>
        <div>
          <p>${item.description ? item.description : "Não há descrição"}</p>
        </div>
        <div>
          <a href="${item.html_url}" target="_blank">${item.html_url}</a>
          <div class="languages">${languageElements || "<p>Sem linguagens registradas</p>"}</div>
        </div>
      `;

      repositories.appendChild(project);
    }
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
  }
}

getApiGithub();
