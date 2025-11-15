import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    if (!validarEmail(email)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    if (!mensaje.trim()) {
      setError("El mensaje no puede estar vacío.");
      return;
    }

    setSuccess("¡Gracias por tu mensaje! Me comunicaré contigo pronto.");
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full max-w-lg shadow-xl rounded-2xl p-4">
          <CardContent>
            <h1 className="text-2xl font-bold text-center mb-4">Contacto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mensaje</label>
                <Textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="rounded-xl"
                />
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
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}