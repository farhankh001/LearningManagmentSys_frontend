import { useRef } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { 
  FormControl, 
  FormHelperText, 
  Typography, 
  useTheme,
  Box,
  alpha,
  Fade
} from '@mui/material';
import JoditEditor from 'jodit-react';

interface RichTextProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  isRequired: boolean;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}

function RichTextInputField<T extends FieldValues>({ 
  label, 
  name, 
  isRequired,
  placeholder,
  minHeight = 200,
  maxHeight = 400
}: RichTextProps<T>) {
  const { control } = useFormContext<T>();
  const editorRef = useRef(null);
  const theme = useTheme();

  // Minimal essential toolbar buttons
  const toolbarButtons = [
    'bold', 'italic', 'underline', '|',
    'ul', 'ol', '|',
    'link', '|',
    'undo', 'redo', "|",'cut', 'copy', 'paste' ,'|', 'paragraph',
  ];

  const editorConfig = {
    readonly: false,
    height: minHeight,
    minHeight: minHeight,
    maxHeight: maxHeight,


    // Essential buttons only
    buttons: toolbarButtons,
    buttonsMD: toolbarButtons,
    buttonsSM: ['bold', 'italic', 'ul', 'ol', 'link'],
    buttonsXS: ['bold', 'italic', 'link'],
    
    // Remove unnecessary features
    removeButtons: [
  'source',
  'fullsize',
  'about',
  'outdent',
  'indent',
  'video',
  'table',
  'file',
  'image',
  'hr',
  'eraser',
  'copyformat',
  'font',
  'fontsize',
  'brush',
  'classSpan',
  'lineHeight',
  'superscript',
  'subscript',
  'selectall',
  'print',
  'preview',
  "br"
],

    
    // UI customization
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showPlaceholder: true,
    placeholder: placeholder || `Enter ${label.toLowerCase()}...`,
    
    // Theme integration
    theme: theme.palette.mode,
    
    // Styling
    style: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
    },
    
    // Editor container styling
    editorCssClass: 'jodit-rich-text-editor',
    
    // Disable spellcheck for cleaner look
    spellcheck: false,
    
    // Disable drag and drop
    uploader: { insertImageAsBase64URI: false },
    
    // Responsive behavior
    toolbarAdaptive: true,
    toolbarSticky: false,
    
    // Clean paste
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    
    // Link options
    link: {
      followOnDblClick: false,
      processVideoLink: false,
      processPastedLink: false,
      openInNewTabByDefault: true
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={isRequired ? { required: 'This field is required' } : undefined}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl sx={{ width: "100%" }}>
            {/* Label */}
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 1,
                fontWeight: 600,
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              {label}
              {isRequired && (
                <Typography 
                  component="span" 
                  sx={{ 
                    color: theme.palette.error.main,
                    fontWeight: 600
                  }}
                >
                  *
                </Typography>
              )}
            </Typography>

            {/* Editor Container */}
            <Box
              sx={{
                border: `1px solid ${error ? theme.palette.error.main : theme.palette.divider}`,
                borderRadius: 0,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  borderColor: error ? theme.palette.error.main : theme.palette.text.disabled,
                  boxShadow: `0 0 0 1px ${alpha(
                    error ? theme.palette.error.main : theme.palette.primary.main, 
                    0.2
                  )}`,
                },
                '&:focus-within': {
                  borderColor: error ? theme.palette.error.main : theme.palette.text.disabled,
                  boxShadow: `0 0 0 2px ${alpha(
                    error ? theme.palette.error.main : theme.palette.primary.main, 
                    0.2
                  )}`,
                },
                
                // Custom Jodit styling
                '& .jodit-rich-text-editor': {
                  '& .jodit-toolbar': {
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    padding: '8px 12px',
                    minHeight: 'auto',
                    
                    '& .jodit-toolbar-button': {
                      color: theme.palette.text.secondary,
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: 1,
                      padding: '6px 8px',
                      margin: '0 2px',
                      transition: 'all 0.2s ease',
                      
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      },
                      
                      '&.jodit-toolbar-button-active': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: theme.palette.primary.main,
                      }
                    },
                    
                    '& .jodit-toolbar-button svg': {
                      width: '16px',
                      height: '16px',
                    }
                  },
                  
                  '& .jodit-workplace': {
                    backgroundColor: theme.palette.background.paper,
                  },
                  
                  '& .jodit-wysiwyg': {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    padding: '16px',
                    fontSize: theme.typography.body1.fontSize,
                    fontFamily: theme.typography.body1.fontFamily,
                    lineHeight: theme.typography.body1.lineHeight,
                    minHeight: `${minHeight}px`,
                    
                    '&:focus': {
                      outline: 'none',
                    },
                    
                    '& p': {
                      margin: '0 0 8px 0',
                      '&:last-child': {
                        marginBottom: 0,
                      }
                    },
                    
                    '& ul, & ol': {
                      paddingLeft: '20px',
                      margin: '8px 0',
                    },
                    
                    '& li': {
                      marginBottom: '4px',
                    },
                    
                    '& a': {
                      color: theme.palette.primary.main,
                      textDecoration: 'underline',
                      
                      '&:hover': {
                        color: theme.palette.primary.dark,
                      }
                    },
                    
                    '& strong': {
                      fontWeight: 600,
                    }
                  },
                  
                  '& .jodit-status-bar': {
                    display: 'none',
                  },
                  
                  '& .jodit-placeholder': {
                    color: theme.palette.text.secondary,
                    fontSize: theme.typography.body1.fontSize,
                    fontStyle: 'italic',
                  }
                }
              }}
            >
              <JoditEditor
                ref={editorRef}
                value={field.value || ''}
                
                config={editorConfig}
                onBlur={(newContent: string) => {
                  field.onChange(newContent);
                }}
                onChange={() => {}} // Disable onChange to prevent constant updates
              />
            </Box>

            {/* Error Message */}
            {error && (
              <Fade in timeout={300}>
                <FormHelperText 
                  sx={{ 
                    color: theme.palette.error.main,
                    mt: 1,
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {error.message}
                </FormHelperText>
              </Fade>
            )}
          </FormControl>
        );
      }}
    />
  );
}

export default RichTextInputField;