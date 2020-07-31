import React from 'react';
import './style.css';
import {
    AiOutlinePlayCircle as Play,
    AiOutlinePauseCircle as Pasue,
    AiOutlineFastForward as Forward,
    AiFillFastBackward as Backward,
    AiOutlineSwap as Repeat
} from 'react-icons/ai';
import Button from '../../generic/Button';
import Select from '../../generic/Select';

const VisualizerControllers = ({ disabledControllers, handleControllers, playing, playSpeed }) => {

    return (
        <div className="VisualizerController">
            <Button className="VisualizerController__Button" icon={Repeat}
                onClick={() => handleControllers({ type: "repeat" })}
                disabled={disabledControllers.repeat}
            />
            <Button className="VisualizerController__Button" icon={Backward}
                onClick={() => handleControllers({ type: "backward" })}
                disabled={disabledControllers.backward} />
            <Button className="VisualizerController__Button" icon={playing ? Pasue : Play}
                onClick={() => {
                    let playload = { type: playing ? "pause" : "play" };
                    handleControllers(playload);
                }}
                iconAtrr={{ size: "3rem" }}
                disabled={disabledControllers.play}
            />
            <Button className="VisualizerController__Button" icon={Forward}
                onClick={() => handleControllers({ type: "forward" })}
                disabled={disabledControllers.forward}
            />
            <Select selectedOption={`${playSpeed}x`}
                options={['0.25x', '0.5x', '1x', '2x', '4x']}
                onSelect={(value) => handleControllers({ type: "playSpeed", value })}
            />
        </div>
    )

}

export default VisualizerControllers;