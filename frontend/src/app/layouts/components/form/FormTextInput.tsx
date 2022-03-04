import { useField } from "formik";
import { Col, FormLabel, Row } from "react-bootstrap";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string
    name: string
    label?: string
    type?: string
    inputFullWidth?: boolean
}

const FormTextInput = (props: Props) => {

    const [field, meta] = useField(props.name)

    return (
        <Row className="mb-3">
            <Col lg={2}>
                <FormLabel className="form__label">{props.label}</FormLabel>
            </Col>

            <Col>
                <Form.Field className={`form__input ${props.inputFullWidth ? "w-100" : ""}`} error={meta.touched && !!meta.error}>
                    <input {...field} {...props} />
                </Form.Field>

                {
                    meta.touched && meta.error ?
                        (
                            <Label className="my-1" basic color="red">{meta.error}</Label>
                        ) :
                        null
                }
            </Col>
        </Row>
    );
}

export default FormTextInput;


