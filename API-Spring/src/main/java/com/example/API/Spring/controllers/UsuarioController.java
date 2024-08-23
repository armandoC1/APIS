package com.example.API.Spring.controllers;

import com.example.API.Spring.models.UsuarioModel;
import com.example.API.Spring.services.UsuarioServices;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private UsuarioServices usuarioServices;

    @GetMapping
    public List<UsuarioModel> obtenerUsuarios() {
        return usuarioServices.obtenerTodos();
    }

    /*
    @PostMapping("/save")
    public UsuarioModel guardarUsuario(@RequestBody UsuarioModel usuario) {
        return this.usuarioServices.guardarUsuario(usuario);
    }
*/
    @PostMapping("/save")
    public ResponseEntity<UsuarioModel> guardarUsuario(@RequestBody UsuarioModel usuario) {
        UsuarioModel usuarioGuardado = usuarioServices.guardarUsuario(usuario);
        return ResponseEntity.ok(usuarioGuardado);
    }

    @GetMapping(path = "/{id}")
    public Optional<UsuarioModel> obtenerPorId(@PathVariable("id") Long id){
        return this.usuarioServices.obtenerPorId(id);
    }

    @GetMapping("/query")
    public ArrayList<UsuarioModel> obtenerUsuarioPorPrioriad(@RequestParam("prioridad") Integer prioridad){
        return this.usuarioServices.buscarPorPrioridad(prioridad);
    }
    @DeleteMapping(path = "/delete/{id}")
    public String eliminarPorId(@PathVariable("id") Long id){
        boolean ok = this.usuarioServices.eliminarUsuario(id);
        if (ok) {
            return "se elimino el usuario con id "+id;
        }else
            return "no se pudo eliminar id "+id;
    }
}

