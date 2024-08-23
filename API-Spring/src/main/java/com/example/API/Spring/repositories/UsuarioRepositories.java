package com.example.API.Spring.repositories;

import com.example.API.Spring.models.UsuarioModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UsuarioRepositories extends CrudRepository<UsuarioModel, Long> {
    public abstract ArrayList<UsuarioModel> findByPrioridad(Integer prioridad); //podria ser con nombre tambien
    boolean existsById(Long id); //posiblemente  a quitar mas tarde

}
