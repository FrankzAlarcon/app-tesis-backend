import config from '@/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>
  ) {}

  async sendConfirmEmail(username: string, email: string, token: string) {
    const name = username
    const verificationLink = this.configService.frontend.url + '/auth/confirm-email?token=' + token
    return this.mailerService.sendMail({
      from: 'Pasantias EPN <pasantiasepn@epn.edu.ec>',
      to: email,
      subject: 'Confirma tu correo electrónico',
      html: `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <tr>
      <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
              <tr>
                  <td style="padding: 20px; text-align: center; font-size: 24px; color: #333333;">
                      Confirma tu correo electrónico
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: center; font-size: 16px; color: #333333;">
                      <p>Bienvenid@ <strong>${name}</strong>,</p>
                      <p>Por favor verifica tu correo electrónico para poder usar App de Pasantías EPN.</p>
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 20px;">
                      <a href="${verificationLink}" 
                          style="background-color: #1d4ed8; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                          VERIFICAR
                      </a>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: center; font-size: 12px; color: #777777;">
                      <p>Si no solicitaste esta verificación, por favor ignora este correo.</p>
                      <p>&copy; 2024 App de Pasantías EPN. Todos los derechos reservados.</p>
                  </td>
              </tr>
          </table>
      </td>
  </tr>
</table>`,
    })
  }

  async sendRecoveryPassword(username: string, email: string, token: string) {
    const name = username
    const resetLink = this.configService.frontend.url + '/auth/recovery-password?token=' + token
    return this.mailerService.sendMail({
      from: 'Pasantias EPN <pasantiasepn@epn.edu.ec>',
      to: email,
      subject: 'Recupera tu contraseña',
      html: `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 20px; background-color: #f4f4f4;">
    <tr>
        <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                <tr>
                    <td style="padding: 20px; text-align: center; font-size: 24px; color: #333333;">
                        Recupera tu contraseña
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; font-size: 16px; color: #333333;">
                        <p>Hola <strong>${name}</strong>,</p>
                        <p>Parece que has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para restablecerla:</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 20px;">
                        <a href="${resetLink}" 
                            style="background-color: #007bff; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            RESTABLECER CONTRASEÑA
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; font-size: 12px; color: #777777;">
                        <p>Si no solicitaste este restablecimiento, por favor ignora este correo.</p>
                        <p>&copy; 2024 App de Pasantías EPN. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
    })
  }
}
