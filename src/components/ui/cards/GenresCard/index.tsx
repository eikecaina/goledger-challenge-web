import Image from "next/image";
import Link from "next/link";
import { GenreSlugEnum } from "../../../../types/Album";
import { IGenre } from "../../../../utils/genres";
import styles from "./styles.module.css";
import { useRouter } from 'next/router';


const getRandomStyle = () => {
  const backgroundColors = ['#c39687', '#9b8b5e', '#f5a623', '#76b041']; // Exemplos de cores de fundo
  const imageUrls = ['/images/simbol1.png', '/images/simbol2.png', '/images/simbol3.png']; // URLs das imagens

  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return {
    backgroundColor: randomColor,
    imageUrl: randomImage,
  };
};

interface GenresCardCardProps {
  genre: IGenre;
}

interface AlbumCardProps {
  name: string;
  artistKey: string
  albumKey: string
}

export function GenresCardCard({ genre }: GenresCardCardProps) {
  return (
    <Link href={`/genre/${GenreSlugEnum.Sertanejo}`} key={genre.id} legacyBehavior>
      <a
        className={styles.root}
        style={{
          backgroundColor: genre.backgroudColor,
        }}
      >
        <h3>{genre.title}</h3>
        <span>
          <Image
            src={`/images/${genre.imgUrl}`}
            alt={genre.title}
            width={100}
            height={100}
          />
        </span>
      </a>
    </Link>
  );
}

export function AlbumCard({ name, artistKey, albumKey }: AlbumCardProps) {
  const { backgroundColor, imageUrl } = getRandomStyle();
  const router = useRouter();

  const handleNavigation = () => {
    router.push({
      pathname: `/artist/${artistKey}`,
      query: { albumKey },
    })
  }

  return (
    <a onClick={handleNavigation} style={{ background: backgroundColor }} className={styles.root}>
      <h3>{name}</h3>
      <span>
        <Image
          src={imageUrl}
          alt={''}
          width={100}
          height={100}
        />
      </span>
    </a>
  );
}