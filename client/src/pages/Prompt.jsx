import React from 'react'
import { Button, Input } from '@chakra-ui/react'

export default function Prompt() {
  return (
    <div style={{maxWidth: "700px", margin: "auto"}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop: '24px', padding:'0px 24px'}}>
            <h2>Friend Name</h2>
            <div>
                <Button size='sm'>Save Friend</Button>
                <Button size='sm'>Edit Friend</Button>
                <Button size='sm'>Remove Friend</Button>
            </div>
        </div>
        <div>
            <Input placeholder='large size' size='lg' />
            <Input placeholder='large size' size='lg' />
        </div>
        
    </div>
  )
}
