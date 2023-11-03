import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, openModal}) => { 
    return (<ul className={css.gallery}>
        {images!== null && images.map(image =>
            <ImageGalleryItem
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                key={image.id}
                id ={image.id}
                tags={image.tags}
                onImageClick={openModal}
            />
        )}
</ul>)
}