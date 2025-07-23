import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  MenuBook as BookIcon
} from '@mui/icons-material';
import styles from './TaskDetailsModal.module.css';

interface TaskDetailsModalProps {
  selectedTask: {
    id: number;
    title: string;
    chapter: number;
    startWeek: number;
    priority: 'high' | 'medium' | 'low';
    color: string;
  } | null;
  setSelectedTask: (task: any) => void;
  notesText: string;
  setNotesText: (text: string) => void;
  calendarAlert: boolean;
  setCalendarAlert: (alert: boolean) => void;
  saveNotes: () => void;
  changePriority: (priority: 'high' | 'medium' | 'low') => void;
  deleteTask: () => void;
  getWeekDate: (week: number) => string;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  selectedTask,
  setSelectedTask,
  notesText,
  setNotesText,
  calendarAlert,
  setCalendarAlert,
  saveNotes,
  changePriority,
  deleteTask,
  getWeekDate
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isOpen = Boolean(selectedTask);

  const handleClose = () => {
    setSelectedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.primary.main;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  if (!selectedTask) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      fullWidth
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          margin: 2,
          borderRadius: '12px',
          height: 'calc(100vh - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : undefined,
          backdropFilter: 'blur(16px)',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: theme.palette.mode === 'light' 
            ? theme.palette.grey[900] 
            : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Typography variant="h6" component="div">
          Detalles de Tarea
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 1, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
          {/* Task Title */}
          <Typography variant="h5" className={styles.taskTitle} color="text.primary">
            {selectedTask.title}
          </Typography>
          
          {/* Task Info Grid */}
          <Paper 
            elevation={1}
            sx={{ 
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box className={styles.taskInfoGrid}>
              <Box className={styles.infoItem}>
                <Typography className={styles.infoLabel} color="text.secondary">
                  Capítulo
                </Typography>
                <Typography className={styles.infoValue} color="primary.main">
                  {selectedTask.chapter}
                </Typography>
              </Box>
              
              <Box className={styles.infoItem}>
                <Typography className={styles.infoLabel} color="text.secondary">
                  Semana
                </Typography>
                <Typography className={styles.infoValue} color="success.main">
                  {selectedTask.startWeek}
                </Typography>
                <Typography className={styles.infoSubtext} color="text.secondary">
                  ({getWeekDate(selectedTask.startWeek)})
                </Typography>
              </Box>
              
              <Box className={styles.infoItem}>
                <Typography className={styles.infoLabel} color="text.secondary">
                  Prioridad
                </Typography>
                <Chip 
                  label={getPriorityLabel(selectedTask.priority)}
                  sx={{ 
                    backgroundColor: getPriorityColor(selectedTask.priority),
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              </Box>
              
              <Box className={styles.infoItem}>
                <Typography className={styles.infoLabel} color="text.secondary">
                  Alerta de Calendario
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={calendarAlert}
                      onChange={(e) => setCalendarAlert(e.target.checked)}
                      color="success"
                    />
                  }
                  label={calendarAlert ? 'Activada' : 'Desactivada'}
                  sx={{ margin: 0 }}
                />
              </Box>
            </Box>
          </Paper>
          
          {/* Priority Change Buttons */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['high', 'medium', 'low'] as const).map(priority => (
              <Button
                key={priority}
                variant={selectedTask.priority === priority ? 'contained' : 'outlined'}
                onClick={() => changePriority(priority)}
                sx={{
                  backgroundColor: selectedTask.priority === priority ? getPriorityColor(priority) : 'transparent',
                  borderColor: getPriorityColor(priority),
                  color: selectedTask.priority === priority ? 'white' : getPriorityColor(priority),
                  '&:hover': {
                    backgroundColor: getPriorityColor(priority),
                    color: 'white'
                  }
                }}
              >
                {getPriorityLabel(priority)}
              </Button>
            ))}
          </Box>
          
          {/* Notes Section */}
          <Paper 
            elevation={1}
            sx={{ 
              p: 2,
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(248, 250, 252, 0.6)' : 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${theme.palette.divider}`,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BookIcon color="primary" />
              <Typography variant="h6" color="text.primary">
                Notas y Observaciones
              </Typography>
            </Box>
            
            <TextField
              multiline
              fullWidth
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Agrega notas detalladas sobre esta tarea...

• Usa markdown para formatear tu texto
• **Negrita** para puntos importantes
• `código` para snippets
• - Lista con viñetas
• ### Subtítulos para organizarte mejor
• [Enlaces](https://ejemplo.com) para referencias

Escribe tus ideas, investigación, recursos y cualquier información relevante para esta tarea."
              variant="outlined"
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  alignItems: 'flex-start'
                },
                '& .MuiInputBase-input': {
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  height: '100% !important',
                  overflow: 'auto !important'
                }
              }}
            />
            
            <Box className={styles.tipText} sx={{ color: 'text.secondary' }}>
              <BookIcon fontSize="small" />
              <Typography variant="body2">
                Tip: El área de texto se expande para una mejor experiencia de escritura
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={saveNotes}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ mr: 1 }}
        >
          Guardar Notas
        </Button>
        
        <Button
          onClick={() => {
            setNotesText('');
            setCalendarAlert(false);
          }}
          variant="outlined"
          startIcon={<RefreshIcon />}
          color="warning"
        >
          Limpiar
        </Button>
        
        <Button
          onClick={deleteTask}
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsModal;
