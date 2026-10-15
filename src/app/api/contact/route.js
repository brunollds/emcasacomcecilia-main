import { Resend } from 'resend';
import { ASSUNTO_LABELS, escapeHtml, isContactSubject } from '@/lib/contactPage';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { nome, email, assunto, mensagem } = await request.json();

    if (!nome?.trim() || !email?.trim() || !mensagem?.trim()) {
      return Response.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }
    if (!isContactSubject(assunto)) {
      return Response.json({ error: 'Assunto inválido.' }, { status: 400 });
    }

    const assuntoLabel = ASSUNTO_LABELS[assunto];
    // O HTML do e-mail leva o texto do visitante escapado; o texto puro e o assunto, como vieram.
    const html = {
      nome: escapeHtml(nome),
      email: escapeHtml(email),
      assunto: escapeHtml(assuntoLabel),
      mensagem: escapeHtml(mensagem),
    };

    await resend.emails.send({
      from: 'Site Em Casa com Cecília <noreply@emcasacomcecilia.com>',
      to: 'contato@emcasacomcecilia.com',
      replyTo: email,
      subject: `[${assuntoLabel}] Mensagem de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assuntoLabel}\n\n${mensagem}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a4d2e;border-bottom:2px solid #ffd700;padding-bottom:8px;">
            Nova mensagem — ${html.assunto}
          </h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tr>
              <td style="padding:8px 0;color:#666;font-size:13px;width:80px;">Nome</td>
              <td style="padding:8px 0;font-weight:600;">${html.nome}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666;font-size:13px;">Email</td>
              <td style="padding:8px 0;font-weight:600;">
                <a href="mailto:${html.email}" style="color:#ff6b35;">${html.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666;font-size:13px;">Assunto</td>
              <td style="padding:8px 0;">${html.assunto}</td>
            </tr>
          </table>
          <div style="background:#fef9f3;border-left:4px solid #ff6b35;padding:16px;border-radius:8px;margin-top:16px;">
            <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${html.mensagem}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:24px;">
            Enviado pelo formulário de contato em emcasacomcecilia.com
          </p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Erro ao enviar mensagem.' }, { status: 500 });
  }
}
