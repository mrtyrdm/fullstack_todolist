export default (props) => {

    const deleteAc = async (id) => {
        props.func(id);
    }

    return (
        <li key={props.key}>
            <span> {props.title}</span>
            <button onClick={()=> deleteAc(props.id)}>Sil</button>
        </li>
    );
}