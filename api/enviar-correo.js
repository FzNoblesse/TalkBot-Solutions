const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { nombre, email, telefono, empresa, servicio, mensaje } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y correo son requeridos' });
    }

    const fecha = new Date().toLocaleDateString('es-MX', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const logoUrl = 'https://www.talkbotsolutions.com.mx/images/talkbot_minimalista_logo.png';

    try {
        const data = await resend.emails.send({
            from: 'TalkBot Notificaciones <contacto@talkbotsolutions.com.mx>',
            to: ['tecnova100@outlook.com'], 
            subject: `🚀 Nuevo Lead: ${nombre} - ${empresa || 'Particular'}`,
            reply_to: email, 
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                    .header { background-color: #2563EB; padding: 30px; text-align: center; color: white; }
                    .content { padding: 30px; color: #333333; }
                    .field { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                    .label { font-weight: bold; color: #2563EB; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; }
                    .value { font-size: 1.1em; margin-top: 5px; display: block; }
                    .message-box { background-color: #f8fafc; border-left: 4px solid #2563EB; padding: 15px; margin-top: 20px; font-style: italic; color: #555; }
                    .footer { background-color: #1f2937; color: #9ca3af; text-align: center; padding: 20px; font-size: 0.85em; }
                    .btn { display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px; font-weight: bold; }
                </style>
            </head>
            <body style="background-color: #f3f4f6; padding: 20px;">
                
                <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: 'Segoe UI', sans-serif;">
                    
                    <div class="header" style="background-color: #2563EB; padding: 30px; text-align: center;">
                        <img src="${logoUrl}" alt="TalkBot Logo" width="64" height="64" style="display:block; margin: 0 auto 10px auto; background: white; border-radius: 50%; padding: 5px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo Prospecto Web</h1>
                        <p style="color: #bfdbfe; margin: 5px 0 0 0;">TalkBot Solutions</p>
                    </div>

                    <div class="content" style="padding: 30px; color: #333;">
                        
                        <p style="text-align: center; color: #666; margin-bottom: 30px;">
                            Has recibido una nueva solicitud de contacto el <br><strong>${fecha}</strong>
                        </p>

                        <div class="field" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                            <span class="label" style="font-weight: bold; color: #2563EB; font-size: 12px; text-transform: uppercase;">Cliente</span>
                            <span class="value" style="font-size: 16px; display: block; margin-top: 5px;">${nombre}</span>
                        </div>

                        <div class="field" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                            <span class="label" style="font-weight: bold; color: #2563EB; font-size: 12px; text-transform: uppercase;">Empresa</span>
                            <span class="value" style="font-size: 16px; display: block; margin-top: 5px;">${empresa || 'No especificada'}</span>
                        </div>

                        <div class="field" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                            <span class="label" style="font-weight: bold; color: #2563EB; font-size: 12px; text-transform: uppercase;">Servicio de Interés</span>
                            <span class="value" style="font-size: 16px; display: block; margin-top: 5px; color: #2563EB; font-weight: bold;">${servicio || 'General'}</span>
                        </div>

                        <div style="display: flex; gap: 10px;">
                            <div class="field" style="flex: 1; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                                <span class="label" style="font-weight: bold; color: #2563EB; font-size: 12px; text-transform: uppercase;">Email</span>
                                <a href="mailto:${email}" class="value" style="font-size: 16px; display: block; margin-top: 5px; color: #333; text-decoration: none;">${email}</a>
                            </div>
                            <div class="field" style="flex: 1; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                                <span class="label" style="font-weight: bold; color: #2563EB; font-size: 12px; text-transform: uppercase;">Teléfono</span>
                                <a href="tel:${telefono}" class="value" style="font-size: 16px; display: block; margin-top: 5px; color: #333; text-decoration: none;">${telefono || '--'}</a>
                            </div>
                        </div>

                        <div class="message-box" style="background-color: #f0f9ff; border-left: 4px solid #2563EB; padding: 20px; margin-top: 20px; border-radius: 4px;">
                            <span style="font-weight: bold; color: #2563EB;">Mensaje del cliente:</span>
                            <p style="margin: 10px 0 0 0; font-style: italic; line-height: 1.5;">"${mensaje || 'Sin mensaje adicional.'}"</p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="mailto:${email}" style="background-color: #2563EB; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Responder ahora</a>
                        </div>

                    </div>

                    <div class="footer" style="background-color: #111827; color: #9ca3af; text-align: center; padding: 20px; font-size: 12px;">
                        <p style="margin: 0;">Este correo fue generado automáticamente por tu sitio web.</p>
                        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} TalkBot Solutions.</p>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error al enviar correo con Resend:", error);
        res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    }
};