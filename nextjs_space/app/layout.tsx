import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import type { Metadata } from 'next'


const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Turma do Tobias | Hotel para Cães e Gatos em SP - Pet Sitter e Pousadinha',
    template: '%s | Turma do Tobias Pet Sitter e Pousadinha',
  },
  description: 'Hotel e hospedagem para cães e gatos em São Paulo com atendimento humanizado e monitoramento 24h. Pet sitter a domicílio, ambiente familiar seguro. Desde 2016. Ligue (11) 98834-1796.',
  keywords: ['hotel para cachorro', 'hospedagem pet', 'hotel para gatos', 'pet sitter São Paulo', 'hotelzinho para cães', 'pousada para pets', 'creche para cachorro', 'pet hotel SP', 'cuidador de animais', 'Turma do Tobias'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Turma do Tobias | Hotel para Cães e Gatos - Atendimento Humanizado',
    description: 'Hospedagem familiar para cães e gatos com monitoramento 24h, muito amor e carinho. Desde 2016 em São Paulo.',
    type: 'website',
    locale: 'pt_BR',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turma do Tobias | Hotel para Cães e Gatos',
    description: 'Hospedagem familiar para pets com atendimento humanizado e monitoramento 24h.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <Providers>
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
        </Providers>
      </body>
    </html>
  )
}
