import { icon } from '../../assets/icons';
import * as Style from './styles';

export const Videos = () => {
  const videos = [
    {
      thumbnail: icon.paper,
      href: 'https://www.youtube.com/watch?v=HQ7cXTIq6FA',
      name: 'Limpeza de caixas de gordura e poços de esgoto',
    },
    {
      thumbnail: icon.paper,
      href: 'https://www.youtube.com/watch?v=PBcFVZBb9U0',
      name: 'Limpeza de reservatórios',
    },
    {
      thumbnail: icon.paper,
      href: 'https://www.youtube.com/watch?v=8KKPzqJM9cI',
      name: 'Inspeção SPDA',
    },
    {
      thumbnail: icon.paper,
      href: 'https://www.youtube.com/watch?v=8ivOW_bZgv8',
      name: `Como trocar a boia da caixa d'água`,
    },
  ];

  videos.forEach((video) => {
    const url = new URL(video.href);
    const params = new URLSearchParams(url.search);
    const videoId = params.get('v');

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // eslint-disable-next-line no-param-reassign
    video.thumbnail = thumbnailUrl;
  });

  return (
    <Style.Container>
      <h2>Videoaulas</h2>
      <Style.Wrapper>
        {videos.map((partner) => (
          <Style.Card key={partner.href} href={partner.href} target="_blank">
            <h5>{partner.name}</h5>
            <img alt="" src={partner.thumbnail} />
          </Style.Card>
        ))}
      </Style.Wrapper>
    </Style.Container>
  );
};
