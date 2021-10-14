import React from 'react';
import Grid from './Grid';

export default function ReposGrid({ repositories }){
    return (
        <div className="box-border">
            <Grid repos={repositories} />
        </div>
    )
}