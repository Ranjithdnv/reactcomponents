export default function Button(props) {
    return (<button disabled={props.disabled} style={props.style} className={`rounded-none ${props.className} hover:bg-primary active:bg-primary font-inter p-3`} onClick={props.onClick}>{props.label}</button>)
}