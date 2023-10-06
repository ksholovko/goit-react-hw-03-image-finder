import css from "./button.module.css";

export default function Button({onClick}) {

    return (
    <div className={css.container}>
<button  className={css.loadMoreBtn} type='button' onClick={onClick}> Load more</button> 
</div>)
}