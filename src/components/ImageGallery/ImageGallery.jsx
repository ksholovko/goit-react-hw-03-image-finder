
import ImageGalleryItem from "./ImageGalleryItem";
import Button from "components/Button/Button";
import css from "./imageGallery.module.css";
import Loader from "components/Loader/Loader";


export function ImageGallery ({status, pictures, totalHits, page, loadMoreImages}) {

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "ready") {
    return (
      <>
        <ul className={css.ImageGallery}>
          {pictures.map((picture) => (
            <ImageGalleryItem
              key={picture.id}
              smallImage={picture.webformatURL}
              largeImage={picture.largeImageURL}
            />
          ))}
        </ul>

        {pictures.length !== 0 &&
          Math.ceil(totalHits / 12) !== page && (
            <Button onClick={loadMoreImages} />
          )}

        {pictures.length === 0 && (
          <p className={css.errorMessage}>
            Sorry, we couldn't find any pictures for this search.
          </p>
        )}
      </>
    );
  }

  if (status === "loading more") {
    return (
      <>
        <ul className={css.ImageGallery}>
          {pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              smallImage={picture.webformatURL}
              largeImage={picture.largeImageURL}
            />
          ))}
        </ul>

        <Loader />
      </>
    );
  }
}