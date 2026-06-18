// Aguarda o carregamento completo da árvore do DOM para evitar erros de execução
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. MECANISMO DO MODO ESCURO (ACESSIBILIDADE)
       ========================================================================== */
    const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
    
    toggleDarkModeBtn.addEventListener("click", () => {
        // Altera a classe no body para disparar as variáveis CSS do tema escuro
        document.body.classList.toggle("dark-theme");
        
        // Altera textualmente o botão para guiar a usabilidade do usuário
        if (document.body.classList.contains("dark-theme")) {
            toggleDarkModeBtn.textContent = "☀️ Modo Claro";
        } else {
            toggleDarkModeBtn.textContent = "🌓 Modo Escuro";
        }
    });

    /* ==========================================================================
       2. VALIDADOR DO QUIZ ANTI-DESINFORMAÇÃO (PROCESSAMENTO DE DADOS)
       ========================================================================== */
    const quizForm = document.getElementById("quiz-form");
    const feedbackBox = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Impede o comportamento padrão de recarregar a página ao enviar o formulário
        event.preventDefault();

        // Captura o input do tipo radio selecionado dentro do escopo do formulário
        const selectedOption = quizForm.querySelector('input[name="quiz-answer"]:checked');

        // Validação preventiva: impede o processamento caso nenhuma opção seja marcada
        if (!selectedOption) {
            feedbackBox.textContent = "⚠️ Por favor, selecione uma resposta antes de verificar!";
            feedbackBox.className = "feedback-box wrong";
            return;
        }

        // Armazena e processa logicamente a escolha do usuário
        const userChoice = selectedOption.value;

        // Limpa classes anteriores e remove o estado oculto da caixa de feedback
        feedbackBox.className = "feedback-box";

        // Aplica a lógica condicional para exibir o feedback correto na tela
        if (userChoice === "correta") {
            feedbackBox.textContent = "🎉 Perfeito! Você agiu como um verdadeiro Cidadão Digital. Interromper o fluxo e checar em agências especializadas é o caminho correto contra as Deepfakes.";
            feedbackBox.classList.add("correct");
        } else {
            feedbackBox.textContent = "❌ Resposta incorreta. Compartilhar por impulso ou engajar com posts inflamatórios ajuda a espalhar a desinformação automatizada.";
            feedbackBox.classList.add("wrong");
        }
    });
});
