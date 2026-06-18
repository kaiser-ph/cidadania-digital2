package com.cidadania.api.controller;

import com.cidadania.api.model.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
// Permite que o arquivo HTML (mesmo aberto localmente) envie dados com segurança
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

    // Banco de dados em memória volátil estruturado
    private final List<Usuario> bancoDeDadosLocal = new ArrayList<>();

    /**
     * Endpoint POST - Recebe e valida o cadastro do front-end
     */
    @PostMapping
    public ResponseEntity<?> cadastrarUsuarioConsciente(@RequestBody Usuario usuario) {
        // Validação defensiva em Java
        if (usuario.getNome() == null || usuario.getNome().trim().isEmpty() ||
            usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Erro: Dados obrigatorios violados.");
        }

        // Processamento e higienização do Objeto Java
        usuario.setId(UUID.randomUUID().toString()); // Gera ID Hexadecimal único
        usuario.setDataRegistro(LocalDateTime.now());
        
        // Sanitização simples contra injeção de scripts maliciosos (XSS) no Servidor
        usuario.setNome(usuario.getNome().replaceAll("<[^>]*>", ""));
        usuario.setEmail(usuario.getEmail().replaceAll("<[^>]*>", ""));

        bancoDeDadosLocal.add(usuario);

        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }

    /**
     * Endpoint GET - Retorna a lista de auditoria completa
     */
    @getMapping
    public ResponseEntity<List<Usuario>> listarTodosParaAuditoria() {
        return ResponseEntity.ok(bancoDeDadosLocal);
    }
}
