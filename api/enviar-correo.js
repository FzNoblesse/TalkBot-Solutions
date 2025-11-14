const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) =>
    {
        if (req.method !== 'POST')
            {
                return res.status(405).json({ message: 'Método no permitido' });
            }
            
            const { nombre, email, empresa, servicio } = req.body;        
            
            if (!nombre || !email)
                {
                    return res.status(400).json({ message: 'Nombre y correo son requeridos' });
                }
                
                try
                {
                    const data = await resend.emails.send(
                        {
                            from: 'Contacto Web <contacto@talkbotsolutions.com.mx>',
                            to: ['tecnova100@outlook.com'], 
                            subject: `Nuevo prospecto: ${nombre}`,
                            reply_to: email, 
                            html: `
                            <h2>Nuevo contacto desde la web TalkBot Solutions</h2>
                            <p><strong>Nombre:</strong> ${nombre}</p>
                            <p><strong>Email del cliente:</strong> ${email}</p>
                            <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
                            <p><strong>Servicio de interés:</strong> ${servicio || 'No especificado'}</p>
                            `
                        });
                        res.status(200).json({ message: "Correo enviado exitosamente" });
                }
                
                catch (error)
                {
                    console.error("Error al enviar correo con Resend:", error);
                    res.status(500).json({ message: "Error al enviar el correo", error: error.message });
                }
    };