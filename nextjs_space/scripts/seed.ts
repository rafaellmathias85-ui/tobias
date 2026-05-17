import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const hashedPassword = await bcrypt.hash("johndoe123", 10);
  await prisma.user.upsert({
    where: { email: "john@doe.com" },
    update: {},
    create: {
      email: "john@doe.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Seed blog posts with pet hotel content
  const blogPosts = [
    {
      title: "Dicas para preparar seu pet para a primeira hospedagem",
      slug: "dicas-primeira-hospedagem",
      content: `A primeira vez que deixamos nosso pet em um hotelzinho pode ser um momento de ansiedade tanto para o tutor quanto para o bichinho. Aqui na Turma do Tobias, queremos que essa experiência seja a mais tranquila possível!\n\nAqui vão algumas dicas:\n\n1. **Faça uma visita prévia**: Traga seu pet para conhecer o ambiente antes da hospedagem. Assim ele já se familiariza com os cheiros e espaços.\n\n2. **Traga itens de casa**: Uma caminha, brinquedo ou cobertor com o cheiro de casa ajuda a acalmar o pet nos primeiros dias.\n\n3. **Mantenha a rotina alimentar**: Informe-nos sobre os horários e tipo de ração que seu pet está acostumado.\n\n4. **Vacinas em dia**: É fundamental que todas as vacinas estejam atualizadas para a segurança de todos.\n\n5. **Conte-nos tudo**: Quanto mais informações tivermos sobre o comportamento e preferências do seu pet, melhor será o cuidado!`,
      excerpt: "Confira nossas dicas para que a primeira hospedagem do seu pet seja tranquila e acolhedora.",
      imageUrl: "/images/small-dog-happy.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
    {
      title: "A importância do acompanhamento 24h na hospedagem pet",
      slug: "importancia-acompanhamento-24h",
      content: `Quando escolhemos onde deixar nosso pet durante uma viagem, a segurança é prioridade. Na Turma do Tobias, oferecemos monitoramento 24 horas por dia, 7 dias por semana.\n\nIsso significa que:\n\n• Sempre há alguém atento ao bem-estar dos hóspedes\n• Qualquer alteração de comportamento é identificada rapidamente\n• Medicamentos são administrados nos horários corretos\n• Os pets nunca ficam sozinhos durante a noite\n\nAlém disso, enviamos fotos e vídeos diários para que você acompanhe tudo em tempo real. É a tranquilidade que você merece enquanto aproveita sua viagem!\n\nNosso diferencial é o atendimento humanizado — tratamos cada pet como parte da família, com carinho e atenção individual.`,
      excerpt: "Saiba como o monitoramento constante garante a segurança e bem-estar do seu pet durante a hospedagem.",
      imageUrl: "/images/dog-relaxed-lying.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
    {
      title: "Cuidados especiais com gatos na hospedagem",
      slug: "cuidados-especiais-gatos",
      content: `Os gatinhos têm necessidades muito específicas quando o assunto é hospedagem. Aqui na Turma do Tobias, entendemos o universo felino e preparamos tudo com muito carinho!\n\n• **Ambiente separado**: Nossos gatos ficam em espaços tranquilos, longe do movimento dos cães\n• **Caixas de areia limpas**: Higiene é fundamental para os felinos\n• **Arranhadores e brinquedos**: Para manter a estimulação física e mental\n• **Esconderijos**: Gatos adoram ter seus cantinhos para se sentir seguros\n• **Atenção ao estresse**: Monitoramos sinais de ansiedade e oferecemos conforto\n\nEntendemos que gatos são mais sensíveis a mudanças de ambiente, por isso nosso cuidado é redobrado. Cada gatinho recebe atenção personalizada e muito cafuné!`,
      excerpt: "Descubra como cuidamos dos felinos com atenção especial na Turma do Tobias.",
      imageUrl: "/images/cat-relaxing-home.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
    {
      title: "Pet Sitter: a opção perfeita para pets que preferem ficar em casa",
      slug: "pet-sitter-domicilio",
      content: `Nem todo pet se adapta bem a ambientes novos, e está tudo bem! Para esses casos, a Turma do Tobias oferece o serviço de Pet Sitter a domicílio.\n\nNosso pet sitter vai até a sua casa para cuidar do seu bichinho no conforto do lar dele. O serviço inclui:\n\n• Alimentação nos horários certos\n• Água fresca e limpa\n• Passeios (para cães)\n• Brincadeiras e companhia\n• Administração de medicamentos\n• Limpeza da caixa de areia (para gatos)\n• Atendemos cães, gatos, roedores, aves e peixes!\n\nÉ a solução perfeita para quem precisa viajar mas quer que seu pet mantenha a rotina. E claro, você recebe atualizações com fotos todos os dias!`,
      excerpt: "Conheça nosso serviço de Pet Sitter a domicílio para pets que preferem o conforto de casa.",
      imageUrl: "/images/pet-sitter-caring.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
    {
      title: "Como escolher o melhor hotel para seu pet",
      slug: "como-escolher-hotel-pet",
      content: `Escolher onde deixar seu pet é uma decisão importante. Aqui estão alguns critérios que você deve considerar:\n\n1. **Visite o local**: Conheça as instalações pessoalmente. Um bom hotel pet não tem nada a esconder.\n\n2. **Pergunte sobre a rotina**: Como é o dia a dia dos hóspedes? Quantos animais ficam por vez?\n\n3. **Verifique a higiene**: O ambiente deve ser limpo e bem ventilado.\n\n4. **Acompanhamento noturno**: Pergunte se há alguém presente durante a noite.\n\n5. **Comunicação**: O hotel envia atualizações sobre seu pet?\n\n6. **Referências**: Procure avaliações de outros tutores.\n\nNa Turma do Tobias, atendemos todos esses critérios e muito mais. Somos um hotelzinho familiar, com número limitado de hóspedes para garantir atenção personalizada. Venha nos conhecer!`,
      excerpt: "Guia prático com dicas essenciais para escolher o hotel ideal para o seu pet.",
      imageUrl: "/images/group-pets-playing.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
    {
      title: "Nossos hóspedes adoram a hora do lanche!",
      slug: "hospedes-hora-lanche",
      content: `Um dos momentos mais esperados do dia aqui na Turma do Tobias é a hora do lanche! Cada pet recebe sua alimentação de acordo com as orientações do tutor.\n\nRespeitamos dietas especiais, horários específicos e preferências alimentares. Afinal, cada bichinho é único!\n\nA alimentação adequada é essencial para o bem-estar durante a hospedagem. Por isso, pedimos sempre que o tutor nos informe:\n\n• Tipo e marca da ração\n• Quantidade por refeição\n• Horários das refeições\n• Restrições alimentares\n• Petiscos permitidos\n\nAssim garantimos que a rotina alimentar do seu pet se mantenha mesmo longe de casa!`,
      excerpt: "A alimentação é personalizada para cada hóspede na Turma do Tobias.",
      imageUrl: "/images/cat-being-groomed.jpg",
      published: true,
      authorName: "Turma do Tobias",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  // Seed gallery images
  const galleryImages = [
    { imageUrl: "/images/hero-dogs-cats-together.jpg", caption: "Nossos hóspedes curtindo juntos!", category: "hospedagem" },
    { imageUrl: "/images/family-dog-sofa.jpg", caption: "Conforto de casa para seu pet", category: "ambiente" },
    { imageUrl: "/images/cat-being-groomed.jpg", caption: "Cuidados especiais com muito carinho", category: "cuidados" },
    { imageUrl: "/images/small-dog-happy.jpg", caption: "Felicidade que contagia!", category: "hospedagem" },
    { imageUrl: "/images/group-pets-playing.jpg", caption: "Hora da brincadeira supervisionada", category: "brincadeiras" },
    { imageUrl: "/images/pet-sitter-caring.jpg", caption: "Atendimento humanizado e carinhoso", category: "cuidados" },
    { imageUrl: "/images/cat-relaxing-home.jpg", caption: "Cantinho especial para os felinos", category: "ambiente" },
    { imageUrl: "/images/dog-relaxed-lying.jpg", caption: "Relaxando depois de muita diversão", category: "hospedagem" },
    { imageUrl: "/images/puppy-playing-toy.jpg", caption: "Brincando com os brinquedos favoritos", category: "brincadeiras" },
    { imageUrl: "/images/dog-cat-cuddling.jpg", caption: "Cães e gatos convivendo em harmonia", category: "hospedagem" },
    { imageUrl: "/images/person-petting-dog.jpg", caption: "Cada pet recebe atenção individual", category: "cuidados" },
    { imageUrl: "/images/cats-resting-together.jpg", caption: "Gatinhos descansando tranquilos", category: "ambiente" },
  ];

  for (const img of galleryImages) {
    const existing = await prisma.galleryImage.findFirst({
      where: { imageUrl: img.imageUrl },
    });
    if (!existing) {
      await prisma.galleryImage.create({ data: img });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
