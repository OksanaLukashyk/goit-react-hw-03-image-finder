import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({id,webformatURL,largeImageURL,tags, onImageClick}) => { 
    return (
        <li className={css.galleryItem} key={id}>
            {/* <a className={css.imgLink} href={largeImageURL}>*/}
                <img src={webformatURL} alt={tags} loading="lazy" onClick={() => onImageClick({ id, largeImageURL })} /> 
            {/* </a> */}
        </li>
    );
};