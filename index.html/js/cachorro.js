import {
    obterCachorros,
    salvarCachorros
} from "./armazenamento.js";

import {
    gerarId
} from "./util.js";


export function cadastrarCachorro(
    dados
) {

    const cachorros =
        obterCachorros();


    const cachorro = {

        id: gerarId(),

        nome:
            dados.nome,

        idade:
            Number(
                dados.idade
            ),

        peso:
            Number(
                dados.peso
            ),

        raca:
            dados.raca,

        tamanho:
            dados.tamanho,

        vacinas:
            dados.vacinas,

        doencas:
            dados.doencas

    };


    cachorros.push(
        cachorro
    );


    const salvo =
        salvarCachorros(
            cachorros
        );


    if (!salvo) {

        throw new Error(
            "Não foi possível salvar o cachorro."
        );
    }


    return cachorro;
}


export function carregarCachorros(
    select
) {

    const cachorros =
        obterCachorros();


    select.innerHTML = `

        <option value="">
            Selecione um cachorro
        </option>

    `;


    cachorros.forEach(
        cachorro => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                cachorro.id;


            option.textContent =
                cachorro.nome;


            select.appendChild(
                option
            );

        }
    );
}


export function exibirCachorros(
    elemento,
    aoClicar
) {

    const cachorros =
        obterCachorros();


    elemento.innerHTML = "";


    if (
        cachorros.length === 0
    ) {

        elemento.innerHTML = `

            <div class="sem-cachorros">

                Nenhum cachorro cadastrado.

            </div>

        `;

        return;
    }


    cachorros.forEach(
        cachorro => {

            const item =
                document.createElement(
                    "button"
                );


            item.type =
                "button";


            item.className =
                "cachorro-item";


            item.textContent =
                cachorro.nome;


            item.addEventListener(
                "click",
                () => {

                    aoClicar(
                        cachorro
                    );

                }
            );


            elemento.appendChild(
                item
            );

        }
    );
}