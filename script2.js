
const campoLogin = document.getElementById("username");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("newusername");
const campoNovaSenha = document.getElementById("newpassword");
const campoRepSenha = document.getElementById("reppassword");

function logar() {
    let login = campoLogin.value;
    let senha = campoSenha.value;
    let mensagem = 'Usuário ou senha incorreta!';
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));

    if (!bancoDeDados) {
        mensagem = "Nenhum usuário cadastrado até o momento";
    } else {
        for (let usuario of bancoDeDados) {
            if (usuario.login === login && usuario.senha === senha) {
                localStorage.setItem("logado", JSON.stringify(usuario));
                if (login === "admin") {
                    mensagem = "Parabéns, você logou como admin!";
                    window.location.href = 'admin.html';
                } else {
                    mensagem = "Parabéns, você logou!";
                    window.location.href = 'home.html';
                }
                alert(mensagem);
                return;
            }
        }
    }
    alert(mensagem);
}

function cadastrar() {
    if (campoNovaSenha.value === campoRepSenha.value) {
        const usuario = {
            login: campoNovoLogin.value,
            senha: campoNovaSenha.value,
            respostas: []
        };
        let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados")) || [];

        for (let item of bancoDeDados) {
            if (usuario.login === item.login) {
                alert("Usuário já cadastrado");
                return;
            }
        }

        bancoDeDados.push(usuario);
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
        alert("Usuário cadastrado com sucesso!");
    } else {
        alert("As senhas são diferentes!");
    }
    console.log(bancoDeDados)
}

function respostas() {
    let pergunta1 = document.getElementById("pergunta1").value;
    let pergunta2 = document.getElementById("pergunta2").value;
    let pergunta3 = document.getElementById("pergunta3").value;
    let pergunta4 = document.getElementById("pergunta4").value;

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));

    if (usuarioLogado && bancoDeDados) {
        for (let usuario of bancoDeDados) {
            if (usuario.login === usuarioLogado.login) {
                usuario.respostas = [pergunta1, pergunta2, pergunta3, pergunta4];
                localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
                alert("Respostas cadastradas com sucesso!");
                return;
            }
        }
    } else {
        alert("Nenhum usuário logado ou banco de dados inexistente!");
    }
}

function logout() {
    localStorage.removeItem("logado");
    window.location.href = 'index.html';
}

function exibe() {
    let respostasHTML = "";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));

    if (bancoDeDados) {
        for (let usuario of bancoDeDados) {
            respostasHTML += '<br><strong>Usuário:</strong> ' + usuario.login;
            respostasHTML += '<br><strong>Respostas:</strong> ' + usuario.respostas;
            respostasHTML += '<br>';
        }
    }

    document.getElementById("lista").innerHTML = respostasHTML;
}

function limpar() {
    let validacao = prompt("digite 'DELETE'");
    if (validacao === "DELETE") {
        localStorage.removeItem("bancoDeDados");
        alert("Banco de dados limpo com sucesso!");
        window.location.href = 'index.html';
    } else {
        alert("Os dados não foram apagados");
    }
}

function mensagem() {
    localStorage.removeItem('mensagemArmazenada');
    let mensagem1 = prompt('Digite a sua mensagem');
    if (mensagem1 !== null && mensagem1.trim() !== '') {
        let mensagemObj = { mensagem: mensagem1 };
        localStorage.setItem('mensagemArmazenada', JSON.stringify(mensagemObj));
        alert('Sua mensagem foi armazenada com sucesso!');
    } else {
        alert('Por favor, digite uma mensagem válida.');
    }
}

function carregarMensagemENome() {
    let mensagemArmazenada = localStorage.getItem('mensagemArmazenada');
    if (mensagemArmazenada) {
        let mensagemObj = JSON.parse(mensagemArmazenada);
        document.getElementById('mensagem1').innerText = mensagemObj.mensagem;
    } else {
        document.getElementById('mensagem1').innerText = "Nenhuma mensagem armazenada.";
    }
    let usuarioLogado = JSON.parse(localStorage.getItem('logado'));
    if (usuarioLogado) {
        document.getElementById('nomeUsuario').innerText = `Usuário logado: ${usuarioLogado.login}`;
    } else {
        document.getElementById('nomeUsuario').innerText = "Nenhum usuário logado.";
    }
}

function editar_respostas()   {
    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (usuarioLogado && bancoDeDados) {
        for (let usuario of bancoDeDados) {
            if (usuario.login === usuarioLogado.login) {
                if (usuario.respostas) {
                    document.getElementById("pergunta1").value = usuario.respostas[0] || "";
                    document.getElementById("pergunta2").value = usuario.respostas[1] || "";
                    document.getElementById("pergunta3").value = usuario.respostas[2] || "";
                    document.getElementById("pergunta4").value = usuario.respostas[3] || "";
                }
                return;
            }
        }
    } else {
        alert("Nenhum usuário logado ou banco de dados inexistente!");
    }
}
window.onload = carregarMensagemENome;

function Pesquisar() {
    let pesquisa = prompt('Digite o nome do usuário');
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados && bancoDeDados.length > 0) {
        let usuarioEncontrado = false;
        for (let i = 0; i < bancoDeDados.length; i++) {
            let usuario = bancoDeDados[i];
            if (pesquisa === usuario.login) {
                let dadosUsuario = 'Nome: ' + usuario.login + '\n' +
                                   'Respostas: ' + usuario.respostas + '\n' +
                                   'Senha: ' + usuario.senha;
                alert(dadosUsuario);
                usuarioEncontrado = true;
                return;
            }
        }
        if (!usuarioEncontrado) {
            alert('Usuário não encontrado');
        }
    } else {
        alert('Banco de dados vazio ou não encontrado');
    }
}

