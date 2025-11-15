import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const validarPassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (nombre.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!validarEmail(email)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    if (!validarPassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.");
      return;
    }

    setSuccess(`¡Registro exitoso! ¡Bienvenido, ${nombre}!`);
    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full max-w-lg shadow-xl rounded-2xl p-4">
          <CardContent>
            <h1 className="text-2xl font-bold text-center mb-4">Registro</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="rounded-xl"
                />
                {nombre && nombre.length < 3 && (
                  <p className="text-red-600 text-sm mt-1">Debe tener mínimo 3 caracteres.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
                {email && !validarEmail(email) && (
                  <p className="text-red-600 text-sm mt-1">Correo no válido.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                />
                {password && !validarPassword(password) && (
                  <p className="text-red-600 text-sm mt-1">Debe incluir 6+ caracteres, una mayúscula y un número.</p>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-xl text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-green-700 bg-green-100 p-2 rounded-xl text-sm">
                  <CheckCircle size={18} />
                  {success}
                </div>
              )}

              <Button type="submit" className="w-full rounded-xl py-2 text-lg">
                Registrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}