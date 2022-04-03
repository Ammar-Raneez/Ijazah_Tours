import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ParagraphAtom from '../atoms/ParagraphAtom';
import { widthHeightDynamicStyle } from '../utils/helpers';
import { DataCardStyles } from '../styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 120,
  },
});

interface DataCardProps {
  title: string;
  total: number;
}

export default function DataCard({ title, total }: DataCardProps) {
  const classes = useStyles();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  return (
    <Card
      className={classes.root}
      style={{ marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0) }}
      variant="outlined"
    >
      <CardContent>
        <ParagraphAtom text={title} style={DataCardStyles.title} />
        <ParagraphAtom text={total} style={DataCardStyles.total} />
      </CardContent>
    </Card>
  );
}
