// Aguarda o processamento de toda a árvore estrutural do HTML
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. MECANISMO DE ACESSIBILIDADE E TEMA GLOBAL (MODO ESCURO)
       ========================================================================== */
    const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
    
    toggleDarkModeBtn.addEventListener("click", () => {
        // Intercala a classe no body disparando as variáveis dinâmicas do CSS
        document.body.classList.toggle("dark-theme");
        
        // Altera o texto renderizado no botão garantindo a usabilidade informativa
        if (document.body.classList.contains("dark-theme")) {
            toggleDarkModeBtn.textContent = "☀️ Modo Claro";
        } else {
            toggleDarkModeBtn.textContent = "🌓 Modo Escuro";
        }
    });

    /* ==========================================================================
       2. PROCESSAMENTO E VALIDAÇÃO DO QUIZ ANTI-DESINFORMAÇÃO
       ========================================================================== */
    const quizForm = document.getElementById("quiz-form");
    const quizFeedback = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Cancela o recarregamento automático nativo do navegador
        event.preventDefault();

        // Encontra o seletor marcado exclusivamente dentro do escopo do quiz
        const selectedOption = quizForm.querySelector('input[name="quiz-answer"]:checked');

        // Tratamento preventivo de formulário ausente
        if (!selectedOption) {
            quizFeedback.textContent = "⚠️ Seleção Ausente: Por favor, assinale uma das alternativas antes de verificar!";
            quizFeedback.className = "feedback-box wrong";
            return;
        }

        // Isola o valor do dado enviado para processamento de variáveis
        const userSelection = selectedOption.value;
        quizFeedback.className = "feedback-box"; // Limpa estados visuais anteriores

        // Execução da lógica condicional
        if (userSelection === "correta") {
            quizFeedback.textContent = "🎉 Resposta Perfeita! Você agiu em conformidade com a Cidadania Digital. Interromper o fluxo reativo e cruzar dados com agências checadoras barra a reprodução sistêmica de Deepfakes.";
            quizFeedback.classList.add("correct");
        } else {
            quizFeedback.textContent = "❌ Resposta Incorreta. Disseminar em canais privados por impulso ou inflamar comentários nas redes expande a métrica de relevância algorítmica da desinformação.";
            quizFeedback.classList.add("wrong");
        }
    });

    /* ==========================================================================
       3. SCRIPT DINÂMICO DA CENTRAL DE DENÚNCIAS (DESAFIO TÉCNICO DE COLETA DE DADOS)
       ========================================================================== */
    const reportingForm = document.getElementById("reporting-form");
    const reportFeedback = document.getElementById("report-feedback");

    reportingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Captura e processamento das strings submetidas pelo usuário
        const inputUrl = document.getElementById("media-url").value.trim();
        const mediaPlatform = document.getElementById("media-type").value;
        const rawName = document.getElementById("user-name").value.trim();
        
        // Define nome padrão se o usuário optar pelo anonimato
        const processedName = rawName === "" ? "Cidadão Anônimo" : rawName;

        // Limpa a caixa de feedback de alertas antigos
        reportFeedback.className = "feedback-box";

        // Validação de segurança simples para garantir o preenchimento da URL
        if (inputUrl === "") {
            reportFeedback.textContent = "⚠️ Erro: É mandatório inserir o link da mídia para a análise.";
            reportFeedback.classList.add("wrong");
            return;
        }

        // Simulação dinâmica de computação de metadados
        reportFeedback.innerHTML = `✨ <strong>Obrigado, ${processedName}!</strong><br> 
        O link originário da plataforma <em>${mediaPlatform.toUpperCase()}</em> foi catalogado em nossa base de dados com sucesso. Nossa equipe de checagem analisará o código estrutural da mídia em breve. Continue vigilante!`;
        reportFeedback.classList.add("correct");

        // Limpa todos os campos digitados no formulário após a submissão concluída
        reportingForm.reset();
    });
});
