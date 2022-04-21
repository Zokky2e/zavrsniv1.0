import React from 'react';
import { useAuthValue } from '../components/User/UserContext';




function MyNotes(){
    const currentUser = useAuthValue();
    if(currentUser===null)return(<div>Not signed in, no notes</div>);
    return <div>MyNotes</div>
}
export default MyNotes;