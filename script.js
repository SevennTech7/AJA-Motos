
// AJA MOTOS — catálogo, filtros, Stories e WhatsApp

const WHATSAPP_NUMBER = "5500000000000";
// Troque pelo número real, incluindo 55 + DDD, sem espaços ou símbolos.

const motos = [
  {nome:"Honda Biz 125",ano:"2011",categoria:"street",imagem:"biz_125_011.png",descricao:"Modelo compacto e prático para deslocamentos urbanos."},
  {nome:"Honda Biz 125",ano:"2011",categoria:"street",imagem:"biz_125_2011.png",descricao:"Praticidade e versatilidade para a rotina."},
  {nome:"Honda Biz 100",ano:"2015",categoria:"street",imagem:"Biz100_2015.png",descricao:"Motocicleta compacta para uso urbano."},
  {nome:"Honda Bros 160",ano:"2015*",categoria:"trail",imagem:"broos160_2015.png",descricao:"Estilo trail e versatilidade para diferentes trajetos."},
  {nome:"Honda Bros 150",ano:"2012",categoria:"trail",imagem:"bros_150_2012.png",descricao:"Uma opção versátil para a rotina."},
  {nome:"Honda Bros 150",ano:"2008",categoria:"trail",imagem:"bros_2008_150.png",descricao:"Modelo trail. Consulte os detalhes deste exemplar."},
  {nome:"Honda Bros 150",ano:"2011",categoria:"trail",imagem:"bros2011_150.png",descricao:"Versatilidade para trajetos variados."},
  {nome:"Honda CG 150",ano:"2009/2010",categoria:"street",imagem:"CG_150_09_10.png",descricao:"Motocicleta urbana para acompanhar sua rotina."},
  {nome:"Honda CG 150",ano:"2007",categoria:"street",imagem:"CG_150_2007.png",descricao:"Uma opção urbana para quem procura mobilidade."},
  {nome:"Honda Fan 150",ano:"2011/2012",categoria:"street",imagem:"fan_150_11_12.png",descricao:"Proposta prática para os deslocamentos diários."},
  {nome:"Honda Fan 125",ano:"2016/2017",categoria:"street",imagem:"fan125_16_17.png",descricao:"Opção compacta para deslocamentos urbanos."},
  {nome:"Yamaha Fazer 250",ano:"2005*",categoria:"street",imagem:"fazer_2005_250.png",descricao:"Modelo de estilo urbano. Confirme o ano correto com a garagem."},
  {nome:"Honda CG Start",ano:"2016",categoria:"street",imagem:"start_2016.PNG",descricao:"Moto de proposta urbana para o dia a dia."},
  {nome:"Honda XLR 125",ano:"2001",categoria:"trail",imagem:"XLR_125_2001.png",descricao:"Modelo trail. Consulte a disponibilidade."},
  {nome:"Yamaha YBR 125",ano:"2010/2011",categoria:"street",imagem:"YBR_125_10_11.png",descricao:"Motocicleta urbana para seus deslocamentos."},
  {nome:"Yamaha YBR 125",ano:"2014/2015",categoria:"street",imagem:"YBR_125_14_15.png",descricao:"Consulte as condições deste exemplar com a equipe."}
];

const navbar = document.getElementById("navbar");
const nav = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const modal = document.getElementById("storyModal");
let atual = 0;
let focoAnterior = null;

function linkWhatsApp(nome = "") {
  const mensagem = nome
    ? `Olá, AJA Motos! Tenho interesse na ${nome}. Gostaria de mais informações.`
    : "Olá, AJA Motos! Gostaria de conhecer as motos disponíveis.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, {passive:true});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Filtros de categoria.
document.querySelectorAll(".filter-btn").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    botao.classList.add("active");
    const filtro = botao.dataset.filter;

    document.querySelectorAll(".moto-card").forEach(card => {
      const mostrar = filtro === "todas" || card.dataset.category === filtro;
      card.classList.toggle("hidden", !mostrar);
    });
  });
});

function mostrarMoto(indice) {
  atual = (indice + motos.length) % motos.length;
  const moto = motos[atual];

  const foto = document.getElementById("storyImage");
  foto.onerror = () => {
    foto.onerror = null;
    foto.alt = "Imagem não encontrada: " + moto.imagem;
  };
  foto.src = moto.imagem;
  foto.alt = `${moto.nome} ${moto.ano}`;

  document.getElementById("storyName").textContent = moto.nome;
  document.getElementById("storyYear").textContent = "Ano: " + moto.ano;
  document.getElementById("storyCategory").textContent = moto.categoria.toUpperCase();
  document.getElementById("storyDescription").textContent = moto.descricao;
  document.getElementById("storyCounter").textContent =
    `${String(atual + 1).padStart(2,"0")} / ${String(motos.length).padStart(2,"0")}`;

  document.getElementById("storyProgress").style.width =
    `${((atual + 1) / motos.length) * 100}%`;

  document.getElementById("storyContact").href =
    linkWhatsApp(`${moto.nome}, ano ${moto.ano}`);
}

function abrirStories(indice) {
  focoAnterior = document.activeElement;
  mostrarMoto(indice);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function fecharStories() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (focoAnterior) focoAnterior.focus();
}

document.querySelectorAll("[data-open]").forEach(botao => {
  botao.addEventListener("click", () => abrirStories(Number(botao.dataset.open)));
});

document.getElementById("storyPrev").addEventListener("click", () => mostrarMoto(atual - 1));
document.getElementById("storyNext").addEventListener("click", () => mostrarMoto(atual + 1));
document.getElementById("modalClose").addEventListener("click", fecharStories);

modal.addEventListener("click", evento => {
  if (evento.target === modal) fecharStories();
});

document.addEventListener("keydown", evento => {
  if (!modal.classList.contains("open")) return;
  if (evento.key === "Escape") fecharStories();
  if (evento.key === "ArrowLeft") mostrarMoto(atual - 1);
  if (evento.key === "ArrowRight") mostrarMoto(atual + 1);
});

// Arrastar para o lado para trocar de moto no celular.
let inicioToque = 0;
document.querySelector(".story-card").addEventListener("touchstart", evento => {
  inicioToque = evento.changedTouches[0].screenX;
}, {passive:true});

document.querySelector(".story-card").addEventListener("touchend", evento => {
  const diferenca = evento.changedTouches[0].screenX - inicioToque;
  if (Math.abs(diferenca) > 55) mostrarMoto(atual + (diferenca < 0 ? 1 : -1));
}, {passive:true});

// WhatsApp e ano do rodapé.
document.getElementById("whatsappCta").href = linkWhatsApp();
document.getElementById("currentYear").textContent = new Date().getFullYear();
