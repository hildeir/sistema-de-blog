<?php
interface UsuarioDao{
    public function add(Usuario $u);
    public function findById($id);
    public function findAll();
    public function update(Usuario $u);
    public function delete($id);
    public function findByEmail($email);
    public function logar(Usuario $u);
}