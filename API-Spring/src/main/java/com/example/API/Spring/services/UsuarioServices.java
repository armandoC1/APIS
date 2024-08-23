package com.example.API.Spring.services;

import com.example.API.Spring.models.UsuarioModel;
import com.example.API.Spring.repositories.UsuarioRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioServices {
    @Autowired
    UsuarioRepositories usuarioRepositories;


    public ArrayList<UsuarioModel> obtenerTodos(){
        return (ArrayList<UsuarioModel>) usuarioRepositories.findAll();
    }
/*
    public UsuarioModel guardarUsuario(UsuarioModel usuario){
        return usuarioRepositories.save(usuario);
    }
*/
public UsuarioModel guardarUsuario(UsuarioModel usuario) {
    if (usuario.getId() != null && usuarioRepositories.existsById(usuario.getId())) {
        // Actualizar usuario existente
        UsuarioModel usuarioExistente = usuarioRepositories.findById(usuario.getId()).orElseThrow();
        usuarioExistente.setNombre(usuario.getNombre());
        usuarioExistente.setEmail(usuario.getEmail());
        // Otros campos de actualización
        return usuarioRepositories.save(usuarioExistente);
    } else {
        // Crear nuevo usuario
        return usuarioRepositories.save(usuario);
    }
}
    public Optional<UsuarioModel> obtenerPorId(Long id){
        return usuarioRepositories.findById(id);
    }


    public ArrayList<UsuarioModel> buscarPorPrioridad(Integer prioridad){
        return usuarioRepositories.findByPrioridad(prioridad);
    }

    public boolean eliminarUsuario(Long id){
        try{
            usuarioRepositories.deleteById(id);
            return true;
        }catch (Exception err){
            return false;
        }
    }

}
