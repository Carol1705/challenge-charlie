import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'

import { TodayInformation, CurrentSection, Today } from './styles'

import {
    getWindDirection,
    kelvinToCelsius,
    getTempScale,
    convertWindSpeed,
    getTempIcon,
} from '../../utils'

import Title from './title'
import SearchInput from '../input'

const Current = ({
    data,
    color,
    setColor,
    city,
    isCelsius,
    setIsCelsius,
    changeLocation,
    setLoading,
    emptySearch,
}) => {
    const { t } = useTranslation()
    const [icon, setIcon] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [temperature, setTemperature] = useState()
    const [windDegrees, setWindDegrees] = useState()
    const [description, setDescription] = useState('')

    useEffect(() => {
        const now = new Date(data.dt * 1000)
        const temp = kelvinToCelsius(data.temp)
        setColor(getTempScale(temp))
        setTemperature(temp)
        setHumidity(data.humidity)
        setPressure(data.pressure)
        setWindDegrees(data.wind_deg)
        setDescription(data.weather[0].description)
        setWindSpeed(convertWindSpeed(data.wind_speed))
        setIcon(getTempIcon(data.weather[0].id, now.getHours()))
    })

    return (
        <CurrentSection color={color}>
            <SearchInput
                setLoading={setLoading}
                emptySearch={emptySearch}
                changeLocation={changeLocation}
            />
            <Title
                city={city}
                label={t('today')}
                isCelsius={isCelsius}
                temperature={temperature}
                description={description}
                onTemperatureClick={setIsCelsius}
            />
            <Today>
                <img src={icon} alt='today-temperature-icon' />
                <TodayInformation data-cy='weatherInformation'>
                    <p>
                        {t('wind')}: {getWindDirection(windDegrees)} {windSpeed}
                        {'km/h'}
                    </p>
                    <p>
                        {t('humidity')}: {humidity}
                        {'%'}
                    </p>
                    <p>
                        {t('pressure')}: {pressure} {'hPA'}
                    </p>
                </TodayInformation>
            </Today>
        </CurrentSection>
    )
}

export default Current
