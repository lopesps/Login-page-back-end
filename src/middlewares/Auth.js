import express from "express";

const Auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }
};

export default Auth;
